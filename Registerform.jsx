import React, { useState } from 'react';
import './Forms.css';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { fullName: '', email: '', password: '', confirmPassword: '' };

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!fullName.trim()) {
      newErrors.fullName = 'Plz enter full name';
      isValid = false;
    } else if (!nameRegex.test(fullName.trim())) {
      newErrors.fullName = 'Name must contain only letters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Plz enter email';
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Enter a valid email';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Plz enter password';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Plz confirm your password';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);

 if (isValid) {
  fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'User registered successfully') {
        alert('Registered ');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        alert(data.message || 'Failed to register');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Registration failed');
    });
}

};


  return (
  <>

      <main >
        <div className="container my-5">
          <form id="fd" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="data1">
              <label  id="f"  htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <span className="error">{errors.fullName}</span>
            </div>

            <div className="data1">
              <label  id="f"  htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="error">{errors.email}</span>
            </div>

            <div className="data1">
              <label  id="f"  htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="error">{errors.password}</span>
            </div>

            <div className="data1">
              <label  id="f"  htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="error">{errors.confirmPassword}</span>
            </div>

            <button id="fbtn" type="submit">Register</button>
            <p  id="pf">Already have an account? <a href="login">Login</a></p>
          </form>
        </div>
      </main>

    </>
  );
};

export default RegisterForm;
