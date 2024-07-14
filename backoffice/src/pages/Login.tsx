import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import collegeClubLogo from '../assets/collegeclub-logo.png';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface LoginResponse {
  userData: {
    password: string;
    email: string;
    userId: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/admin/login', { email, password })
      .then((response: AxiosResponse<LoginResponse>) => {
        const userId = response.data.userData.userId;
        sessionStorage.setItem('id', userId);
        navigate('/home');
      })
      .catch((error: AxiosError) => {
        console.log('An error occurred', error);
        // Handle error (e.g., display error message to the user)
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <div className="mb-6">
          <img src={collegeClubLogo} alt="College Club Logo" className="w-1/3 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Back Office</h2>
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-1 text-right">
            <a href="/reset" className="text-blue-700 underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
