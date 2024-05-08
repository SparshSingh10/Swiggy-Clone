import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function AddDish() {
  const [formData, setFormData] = useState({img: '',dishName: '',time: '',address: '',dishOwner: ''});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const token = localStorage.getItem('myToken');
    const user = JSON.parse(token);
    if (user && user.firstName) {
      setFormData(prevState => ({ ...prevState, dishOwner: user.firstName }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8080/home', formData);
      navigate('/'); 
      setFormData({img: '',dishName: '',time: '',address: '',dishOwner: ''});
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add a New Dish</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="img" className="text-gray-700">Image URL:</label>
            <input 
              id="img"
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dishName" className="text-gray-700">Dish Name:</label>
            <input 
              id="dishName"
              type="text"
              name="dishName"
              value={formData.dishName}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time" className="text-gray-700">Time (minutes):</label>
            <input 
              id="time"
              type="number"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-700">Address:</label>
            <input 
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button 
            type="submit" 
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDish;
