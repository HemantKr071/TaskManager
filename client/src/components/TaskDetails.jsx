import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Paperclip, Edit, Trash } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/task/${id}`, {
          withCredentials: true,
        });

        console.log(res.data);

        setTask(res.data);
      } catch (err) {
        console.error('Failed to fetch task', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/task/${id}`, {
        withCredentials: true,
      });
      alert('Task deleted');
      navigate('/');
    } catch (err) {
      console.error('Failed to delete task', err);
      alert('Failed to delete task');
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/task/${id}`,
        updatedTask,
        {
          withCredentials: true,
        }
      );
      setTask(res.data);
      setIsEditing(false);
      alert('Task updated');
      navigate('/');
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : 'No date';

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!task) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Task not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-4 inline-flex items-center text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4  !border-gray-500 py-2 border rounded hover:bg-gray-100 flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 !bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
          >
            <Trash className="w-4 h-4 mr-2" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">
              {task.description || 'No description'}
            </p>

            {task.attachments?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Paperclip className="mr-2 w-5 h-5" /> Attachments
                </h3>
                <ul className="space-y-2">
                  {task.attachments.map((a) => (
                    <li
                      key={a.name}
                      className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span>{a.name}</span>
                      </div>
                      <button className="text-blue-600 text-sm hover:underline">
                        Download
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div>
          <div className="bg-white p-6 rounded shadow space-y-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`px-2 py-1 text-sm rounded ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Priority</p>
              <span className={`px-2 py-1 text-sm rounded ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p>{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p>{formatDate(task.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <TaskForm editTask={task} onClose={() => setIsEditing(false)} onSubmit={handleUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
