/* eslint-disable no-alert */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post<{ message: string }>(
        'http://localhost:3000/account/signup',
        {
          username,
          password,
          email,
          phone,
        },
      );
      navigate('/login');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className=" bg-neutral-100 flex h-screen justify-center items-center">
      <div className="bg-sky-50 rounded">
        <h2 className="text-4xl text-sky-700 justify-center m-4 w-96">
          Sign Up
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
          <label className="text-gray-600 text-xl m-3 ">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 block"
            />
          </label>
          <label className="text-gray-600 text-xl m-3 ">
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 block"
            />
          </label>
          <br />
          <button
            type="button"
            onClick={handleSignup}
            className="m-3 -mt-3 text-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 border border-blue-500 hover:border-transparent rounded"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
