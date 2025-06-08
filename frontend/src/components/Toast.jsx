import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center ${
      type === 'success' 
        ? 'bg-green-500' 
        : 'bg-red-500'
    } text-white animate-slide-up`}>
      <span className="mr-2">
        {type === 'success' ? '✓' : '⚠️'}
      </span>
      {message}
      <button 
        onClick={onClose} 
        className="ml-4 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;