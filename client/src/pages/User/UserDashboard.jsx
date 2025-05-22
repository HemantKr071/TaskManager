import { useEffect, useState } from 'react';
import { NavBar } from '../../components/NavBar';
import TaskForm from '../../components/TaskForm';
import TasksList from '../../components/TaskList';
import { useNavigate } from 'react-router-dom';

export const UserDashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();
  // Open form for creating a new task
  const openCreateTaskForm = () => {
   
    setEditTask(null);
    setShowTaskForm(true);
  };

  // Open form for editing an existing task
  const openEditTaskForm = (task) => {
     console.log(task);
    setEditTask(task);
    setShowTaskForm(true);
  };

  // Close the task form modal
  const closeTaskForm = () => {
    setEditTask(null);
    setShowTaskForm(false);
  };

  useEffect(()=> {
    const user = localStorage.getItem('user');
    if(!user){
        navigate('/login');
    }
  },[])

  return (
    <div>
      <NavBar onAddTask={openCreateTaskForm} />

      <div className="max-w-5xl mx-auto mt-8 px-4">
        {/* Pass edit callback to task list */}
        <TasksList onEditTask={openEditTaskForm} />
      </div>

      {showTaskForm && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
            <button
              onClick={closeTaskForm}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Pass editTask to TaskForm to pre-fill if editing */}
            <TaskForm onClose={closeTaskForm} editTask={editTask} />
          </div>
        </div>
      )}
    </div>
  );
};
