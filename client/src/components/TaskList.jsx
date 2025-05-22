import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Paperclip, ArrowRight } from 'lucide-react';

const dummyTasks = [
  {
    id: 1,
    title: "Design Landing Page",
    description: "Create a modern landing page for the new product.",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-06-01",
    attachments: [{ name: "mockup.jpg" }, { name: "specs.pdf" }],
  },
  {
    id: 2,
    title: "Fix Login Bug",
    description: "Resolve issue where login fails intermittently.",
    status: "todo",
    priority: "medium",
    dueDate: "2025-06-05",
    attachments: [],
  },
  {
    id: 3,
    title: "Write Documentation",
    description: "Document the new API endpoints.",
    status: "completed",
    priority: "low",
    dueDate: "2025-05-20",
    attachments: [{ name: "api-docs.docx" }],
  },
];

const TasksList = ({ onEditTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('http://localhost:3000/api/v1/task/all',{
          params: { email: user.email },   
          withCredentials: true,
        });
        console.log("getting tasks",res.data);
        setTasks(res.data || []);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
       // setTasks(dummyTasks); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityBadge = (priority) => {
    const base = "px-2 py-1 text-xs rounded font-medium";
    switch (priority) {
      case 'high':
        return <span className={`${base} bg-red-500 text-white`}>High</span>;
      case 'medium':
        return <span className={`${base} bg-yellow-500 text-white`}>Medium</span>;
      case 'low':
        return <span className={`${base} bg-green-500 text-white`}>Low</span>;
      default:
        return <span className={`${base} border border-gray-300`}>Unknown</span>;
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 text-xs rounded font-medium";
    switch (status) {
      case 'completed':
        return <span className={`${base} bg-green-100 text-green-800`}>Completed</span>;
      case 'in-progress':
        return <span className={`${base} bg-blue-100 text-blue-800`}>In Progress</span>;
      case 'todo':
        return <span className={`${base} bg-gray-100 text-gray-800`}>To Do</span>;
      default:
        return <span className={`${base} border border-gray-300`}>Unknown</span>;
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter || task.priority === filter;
  });

  if (loading) {
    return <p className="text-gray-600 text-center py-10">Loading tasks...</p>;
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
        <p className="text-gray-500">No tasks match your selected filter.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4 relative z-10">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="todo">To Do</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto border-gray-200 shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-sm font-semibold p-4">Title</th>
              <th className="text-left text-sm font-semibold p-4">Status</th>
              <th className="text-left text-sm font-semibold p-4">Priority</th>
              <th className="text-left text-sm font-semibold p-4">Due Date</th>
              <th className="text-right text-sm font-semibold p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredTasks.map((task) => (
              <tr
                key={task._id || task.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/tasks/${task._id || task.id}`)}
              >
                <td className="p-4">
                  <div className="font-medium">{task.title}</div>
                  {task.attachments?.length > 0 && (
                    <div className="flex items-center mt-1 text-gray-500 text-sm">
                      <Paperclip className="h-4 w-4 mr-1" />
                      {task.attachments.length} attachment{task.attachments.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </td>
                <td className="p-4">{getStatusBadge(task.status)}</td>
                <td className="p-4">{getPriorityBadge(task.priority)}</td>
                <td className="p-4">
                  {task.dueDate ? (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {formatDate(task.dueDate)}
                    </div>
                  ) : (
                    <span className="text-gray-400">No due date</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  {/* Edit button */}
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-800 mr-2"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row click
                      if (onEditTask) onEditTask(task);
                    }}
                  >
                    Edit
                  </button>

                  {/* View details button */}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tasks/${task._id || task.id}`);
                    }}
                  >
                    <ArrowRight className="h-4 w-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
     
  );
};

export default TasksList;
