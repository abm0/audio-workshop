import React from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl mb-4 text-black">User Dashboard</h1>
      <button 
        className="bg-red-500 text-white p-2 rounded mb-4"
        onClick={() => navigate('/')}
      >
        Logout
      </button>
      <TodoList />
    </div>
  );
}

export default DashboardPage;
