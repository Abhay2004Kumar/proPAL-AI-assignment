import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


const Dashboard = ({ user, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">PropalAI</h1>
          <p className="text-gray-400 text-sm">Welcome, {user?.username}</p>
        </div>
        
        <nav>
          <ul>
            <li className="mb-2">
              <Link
                to="/dashboard/profile"
                className={`block px-4 py-2 rounded ${location.pathname.includes('profile') ? 'bg-blue-700' : 'hover:bg-gray-700'}`}
              >
                Profile
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/dashboard/agent"
                className={`block px-4 py-2 rounded ${location.pathname.includes('agent') ? 'bg-blue-700' : 'hover:bg-gray-700'}`}
              >
                Agent
              </Link>
            </li>
          </ul>
        </nav>
        
        <button
          onClick={handleLogout}
          className="mt-4 w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;