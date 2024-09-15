import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(BASE_URL, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id: ${id}`);
    }
    return response.json();
  };

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};