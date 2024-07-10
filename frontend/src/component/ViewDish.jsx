import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useParams } from 'react-router-dom';

function ViewDish() {
  const { id } = useParams();
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/${id}`);
        // console.log(response.data);
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dish:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
    <div className="md:flex">
    <div className="md:flex-shrink-0 w-full md:w-auto bg-gray-200">
  {dishes && dishes.img ? (
    <img className="h-auto w-full object-cover md:w-96" src={dishes.img} alt="Dish" />
  ) : (
    <p className="h-screen flex items-center justify-center text-5xl text-gray-500">No image available</p>
  )}
</div>


      <div className="p-8 flex flex-col justify-center">
        <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4">{dishes && dishes.dishOwner}</div>
        <a href="#" className="text-4xl leading-tight font-medium text-black hover:underline mb-6">{dishes && dishes.dishName}</a>
        <p className="text-2xl text-gray-500 mb-4">{dishes && dishes.address}</p>
        <p className="text-2xl text-gray-500 mb-8">Cooking Time: {dishes && dishes.time} minutes</p>
        <div className="flex justify-center">
        <NavLink to={`/home/${id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full mr-4">Edit</button>
          </NavLink>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default ViewDish;
