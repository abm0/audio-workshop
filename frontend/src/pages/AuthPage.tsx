import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 mb-4 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
