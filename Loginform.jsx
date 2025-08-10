import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Forms.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError('Plz enter email');
      isValid = false;
    } else if (!expression.test(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Plz enter password');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      try {
        const res = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Login successful!');

          if (data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }

          setEmail('');
          setPassword('');
        } else {
          alert(data.message || 'Login failed!');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('Something went wrong!');
      }
    }
  };

  return (
    <main>
      <div className="container my-5">
        <form id="fd" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="data1">
            <label id="f" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="error">{emailError}</span>
          </div>
          <div className="data1">
            <label id="f" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error">{passwordError}</span>
          </div>
          <button id="fbtn" type="submit">Login</button>
          <p id="pf">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
