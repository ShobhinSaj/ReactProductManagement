import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { username, password, firstName});
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Sign up failed', error.response?.data);
      } else {
        console.error('Sign up failed', error);
      }
    }
  };

  return (
    <div className="container w-50  mt-5 border border-2 border-black rounded-2 p-2">
      <h2 className='text-center mb-4'>Sign Up</h2>
      <form onSubmit={handleSignUp}>
      <div className="mb-3">
          {/* <label htmlFor="firstname" className="form-label">Firstname</label> */}
          <input
            type="text"
            className="form-control"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Firstname'
            required
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="username" className="form-label">Username</label> */}
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
            minLength={3}
            maxLength={10}
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="password" className="form-label">Password</label> */}
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            minLength={8}
            maxLength={10}
          />
        </div>
        <div className='text-center'>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>  
      </form>
    </div>
  );
};

export default SignUpPage;