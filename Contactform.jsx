import React, { useState } from 'react';
import './Forms.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');

const handleContact = async (event) => {
  event.preventDefault();

  let isValid = true;

  setNameError('');
  setEmailError('');
  setSubjectError('');
  setMessageError('');

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!name.trim()) {
    setNameError('Plz enter name');
    isValid = false;
  } else if (!nameRegex.test(name)) {
    setNameError('Name must contain only letters');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    setEmailError('Plz enter email');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setEmailError('Enter a valid email');
    isValid = false;
  }

  if (!subject.trim()) {
    setSubjectError('Subject is required');
    isValid = false;
  } else if (subject.trim().length < 5) {
    setSubjectError('Subject must be at least 5 characters');
    isValid = false;
  }

  if (!message.trim()) {
    setMessageError('Plz write a message');
    isValid = false;
  } else if (message.trim().length < 10) {
    setMessageError('Message must be at least 10 characters');
    isValid = false;
  }

  
  if (isValid) {
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        alert(data.message || 'Failed to send message!');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      alert('Something went wrong!');
    }
  }
};


  return (
    <main>
      <div className="container my-5">
        <form id="fd" onSubmit={handleContact}>
          <h2>Contact Us</h2>

          <div className="data1">
            <label id="f" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="error">{nameError}</span>
          </div>

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
            <label id="f" htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <span className="error">{subjectError}</span>
          </div>

          <div className="data1">
            <label id="f" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <span className="error">{messageError}</span>
          </div>

          <button id="fbtn" type="submit">Send Message</button>

          <p id="pf">
            Want to join us? <a href="/register">Register</a> or{' '}
            <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </main>
  );
};

export default ContactForm;
