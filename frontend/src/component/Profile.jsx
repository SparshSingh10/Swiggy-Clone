import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    number: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
      const token = localStorage.getItem('myToken');
      const userData = JSON.parse(token);
      const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/${userData._id}`);
      setUser(response.data);
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({...prevUser, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.patch(`${import.meta.env.VITE_HOST_URL}/${user._id}`, user); 
  };

  return (
    <div>
        <Navbar/>
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="px-6 py-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Number:</label>
          <input type="text" name="number" value={user.number} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
          <select name="gender" value={user.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Nonbinary</option>
            <option value="asexual">Asexual</option>
            <option value="transgender">Transgender</option>
            <option value="pansexual">Pansexual</option>
            <option value="genderqueer">Genderqueer</option>
          </select>
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Save Changes</button>
      </form>
    </div>
    </div>
  );
}

export default Profile;
