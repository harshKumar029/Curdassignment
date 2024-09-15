import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        console.log(data)
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#7042d2]">User Details</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 border-b-2">Name</th>
              <th className="text-left px-4 py-2 border-b-2">Email</th>
              <th className="text-left px-4 py-2 border-b-2">Phone</th>
              <th className="text-left px-4 py-2 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.phone}</td>
                <td className="px-4 py-2 border-b space-x-2">
                  <Link
                    to={`/user/${user.id}`}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </Link>
                  <Link
                    to={`/create?id=${user.id}`}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        to="/create"
        className="block text-center mt-6 bg-[#7042d2] text-white py-2 px-4 rounded-lg hover:bg-[#5c21d2] transition duration-300"
      >
        Create New User
      </Link>
    </div>
  );
};

export default UserList;
