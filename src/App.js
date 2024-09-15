import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/create" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
