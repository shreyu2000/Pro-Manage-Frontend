import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle login with email and password
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src="path/to/your/image" alt="Your Image" />
      </div>
      <div className="right-side">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Log in</button>
        </form>
        <p>Have no account yet? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
