import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link,NavLink} from "react-router-dom";
function Home() {
  const [dishesData, setDishesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/home");
      if (response.status === 200) {
        setDishesData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete =async(id)=>{
    await axios.delete(`http://localhost:8080/home/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="container mx-auto py-8">
      <div className="bg-red-500 p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-semibold text-white">North Indian Cuisine</h1>
        <p className="text-white">Indulge with the best of North Indian cuisines.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dishesData.length > 0 ? (
          dishesData.map((item, index) => (
            <div key={index} className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img src={item.img} alt="" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.dishName}</h2>
                <p className="text-gray-600 mb-4">{item.time} minutes</p>
                <p className="text-gray-700">Uploaded by - {item.dishOwner}</p>
              </div>
              <div className="bg-gray-300 flex justify-between p-4">
                <NavLink to={`/home/${item._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">View</button>
                </NavLink>
                <div>
                  <button onClick={() => handleEdit(item._id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">No dishes available</p>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default Home;
