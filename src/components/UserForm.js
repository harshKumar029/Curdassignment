import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, fetchUserById } from '../api';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const loadUser = async () => {
        try {
          const user = await fetchUserById(id);
          setUserData({
            name: user.name,
            email: user.email,
            phone: user.phone,
          });
        } catch (err) {
          setError('Failed to load user data');
        }
      };
      loadUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, userData);
      } else {
        await createUser(userData);
      }
      navigate('/');
    } catch (err) {
      setError('Failed to submit form');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#7042d2]">
          {id ? 'Edit User' : 'Create User'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#7042d2] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#7042d2] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#7042d2] focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#7042d2] text-white py-2 px-4 rounded-lg hover:bg-[#5c21d2] transition duration-300"
          >
            {id ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
