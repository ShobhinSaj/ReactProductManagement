import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setFirstName: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setFirstName }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('firstName', response.data.firstName);
      setFirstName(response.data.firstName);
      navigate('/products');
    } catch (error:any) {
      if (error.response.status === 401) {
        setShowPopup(true);
      }
      
    }
  };

  const handleSignupNavigation = () => {
    console.log("Navigating to signup page"); // Debugging line
    navigate('/signup');
  };
  const closeModal = () => {
    setShowPopup(false);
  };
  return (
    <div className="container w-50 mt-5 border border-2 border-black rounded-2 p-2">
      <h2 className='text-center mb-4'>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="form-control"
            id="inputUsername"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div className='text-center'>
          <button type="submit" className="btn btn-primary mx-1">Login</button>
          <button type="button" className="btn btn-success mx-1" onClick={handleSignupNavigation}>
            Signup
          </button>
        </div>
      </form>
      {showPopup && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Login Failed!</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>User Account not found! Please Sign up..</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
