import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import collegeClubLogo from '../assets/collegeclub-logo.png';
import axios, { AxiosError } from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/admin/reset-password', {
        email,
      });
      alert('Password reset email sent successfully');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // AxiosError contains detailed information about the error
        console.error('Error resetting password:', error.message);
        alert('Error resetting password. Please try again.');
      } else {
        // Fallback for unknown error types
        console.error('Unknown error occurred:', error);
        alert('Unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <div className="mb-6">
          <img src={collegeClubLogo} alt="Forgot Password" className="w-1/3 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
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
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <a href="/" className="text-blue-700 underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
