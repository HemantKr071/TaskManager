import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ onClose, editTask = null }) => {
  const [email,setEmail] = useState("");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
  });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // Pre-fill form when editing
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setEmail(user.email);
    if (editTask) {
      setFormData({
        title: editTask.title || '',
        description: editTask.description || '',
        status: editTask.status || 'todo',
        priority: editTask.priority || 'medium',
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : '',
        email:user.email || "",
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > 3) {
      alert('You can only upload up to 3 files.');
      return;
    }

    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('status', formData.status);
    formPayload.append('priority', formData.priority);
    formPayload.append('dueDate', formData.dueDate);
    formPayload.append('email', email);

    files.forEach((file) => {
      formPayload.append('documents', file);
    });

    try {
      const url = editTask
        ? `http://localhost:3000/api/v1/task/${editTask._id}`
        : 'http://localhost:3000/api/v1/task/create';
      const method = editTask ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: formPayload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log("Task Created",response);
      alert(`Task ${editTask ? 'updated' : 'created'} successfully!`);
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
      });
      setFiles([]);

      if (onClose) onClose();
      navigate('/');
    } catch (error) {
      console.error(`Failed to ${editTask ? 'update' : 'create'} task:`, error);
      alert(`Failed to ${editTask ? 'update' : 'create'} task`);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
    });
    setFiles([]);
    if (onClose) onClose();
  };

  return (
    <div className="relative max-w-xl mx-auto bg-white rounded-lg p-6 mt-10 shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {editTask ? 'Edit Task' : 'Create New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            className="w-full border rounded-md px-3 py-2 min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Attachments</label>
          <label className="flex items-center justify-center w-full border border-dashed border-gray-300 rounded-md py-3 cursor-pointer hover:bg-gray-50">
            <span>Upload files</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 rounded-md text-sm"
                >
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 !bg-black text-white rounded-md font-semibold hover:bg-gray-800"
          >
            {editTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
