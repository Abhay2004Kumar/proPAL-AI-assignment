import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome to PropalAI</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          A simple authentication and settings dashboard app.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600 dark:text-gray-300">Already have an account? </span>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;