import { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const NavBar = ({onAddTask}) => {
  const [isAuthenticated,setIsAuthenticated] = useState(true);
  const [user,setUser] = useState('A');
  const navigate = useNavigate();

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser);
      setIsAuthenticated(true);
      if (userObj?.email) {
        setUser(userObj.email.charAt(0).toUpperCase());
      } else {
        setUser(getInitial(userObj)); // fallback
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
    }
  }
}, []);
  const getInitial = (name) => {
    if (!name) return 'H';
    return name.charAt(0).toUpperCase();
  };
  
  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0'; // or call logout API
    localStorage.removeItem('user');
    navigate('/login');
  };

  /*if (loading) {
    return <div className="w-full h-16 shadow-lg bg-white flex items-center justify-center">Loading...</div>;
  }*/

  return (
    <div className='w-full h-16 shadow-lg'>
      <div className='flex justify-between items-center px-6 h-full'>
        {/* Left: App Title */}
        <div className='text-2xl font-extrabold'>Task Manager</div>

        {/* Right: Authenticated or Guest */}
        {isAuthenticated ? (
        

          <div className='flex'>
            <button  onClick={onAddTask} className='mr-5 !bg-gray-900 text-white !font-bold px-4 py-2.5 rounded'> Add New Task </button>
            <div className='relative group'>
                <div className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg cursor-default'>
                {user}
                </div>
                <div className='absolute right-0 mt-2 w-28 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50'>
                <button
                    onClick={handleLogout}
                    
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm'
                >
                    Logout
                </button>
                </div>
            </div>
          </div>
        ) : (
          <div className='text-sm text-gray-500'>Guest</div>
        )}
      </div>
    </div>
  );
};
