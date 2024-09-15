import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../api';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await fetchUsers();
        const foundUser = users.find(user => user.id === parseInt(id));
        setUser(foundUser);
      } catch (err) {
        setError('Failed to fetch user');
      }
    };

    loadUser();
  }, [id]);

  const handleEdit = () => {
    window.location.href = `/create?id=${id}`;
  };

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      window.location.href = '/';
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#7042d2]">{user.name}</h1>
        <p className="text-gray-600 text-center mb-4">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600 text-center mb-6">
          <strong>Phone:</strong> {user.phone}
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-between space-x-4">
          <button
            onClick={handleEdit}
            className="w-full bg-[#7042d2] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#5c21d2] transition duration-300 ease-in-out"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>

        <Link
          to="/"
          className="block text-center mt-6 text-[#7042d2] hover:underline font-medium"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
