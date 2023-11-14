// In your component where you handle signup
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../Auth/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [company, setCompany] = useState('');
  const [sites, setSites] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [error, setError] = useState(null);

  const handleSignupClick = async () => {
    try {
      const user = await signup({ email, password, fullname, company, sites, mobileno });
      dispatch({ type: 'LOGIN', payload: user });
      // Handle successful signup, such as redirecting to another page
      console.log('Signup successful:', user);
    } catch (error) {
      setError(error.message);
      console.error('Signup error:', error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Full Name:</label>
      <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
      <label>Company:</label>
      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
      <label>Sites:</label>
      <input type="text" value={sites} onChange={(e) => setSites(e.target.value)} />
      <label>Mobile Number:</label>
      <input type="text" value={mobileno} onChange={(e) => setMobileno(e.target.value)} />
      <button onClick={handleSignupClick}>Signup</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
