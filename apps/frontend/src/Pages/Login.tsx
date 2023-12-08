/* eslint-disable no-alert */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post<{ message: string }>(
        'http://localhost:3000/account/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      );
      navigate('../');
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-neutral-100 flex h-screen justify-center items-center">
      <div className="bg-sky-50 rounded">
        <h2 className="text-4xl text-sky-700 justify-center m-4 w-96">
          Log In
        </h2>
        <form>
          <label className="text-gray-600 text-xl m-3 ">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 block"
            />
          </label>
          <br />
          <label className="text-gray-600 text-xl m-3">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 block"
            />
          </label>
          <br />
          <button
            type="button"
            onClick={handleLogin}
            className="m-3 -mt-3 text-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 border border-blue-500 hover:border-transparent rounded"
          >
            Log In
          </button>
        </form>
        <p className="m-3">
          Don't have an account?{' '}
          <Link to="../signup" className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
