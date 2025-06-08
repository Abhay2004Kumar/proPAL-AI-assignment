import React, { useState } from 'react';
import Toast from '../components/Toast';

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    newEmail: '',
    password: '',
    newPassword: ''
  });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          newEmail: formData.newEmail,
          password: formData.password,
          newPassword: formData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Update failed');
      }
      
      setToast({
        message: 'Profile updated successfully!',
        type: 'success'
      });
      
      if (formData.newEmail) {
        setUser({ ...user, email: formData.newEmail });
      }
      
      setFormData(prev => ({
        email: formData.newEmail || prev.email,
        newEmail: '',
        password: '',
        newPassword: ''
      }));
    } catch (err) {
      setToast({
        message: err.message,
        type: 'error'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors duration-300">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Information</h3>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Username:</span> {user?.username}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Email:</span> {user?.email}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Phone:</span> {user?.phone || 'Not provided'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="newEmail">
            New Email
          </label>
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white transition duration-200"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Current Password (required for changes)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white transition duration-200"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white transition duration-200"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;