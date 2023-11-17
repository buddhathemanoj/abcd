import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Auth/auth';
import Cookies from 'js-cookie';
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const handleLoginClick = async () => {
    try {
      const user = await login({ email, password });
      dispatch({ type: 'LOGIN', payload: user });
      console.log("user", user)
      const accessToken = user.accessToken
      Cookies.set("accessToken",accessToken ,{expires:1} )
      if (user.role === "admin" || user.role === "employee") {
        navigate('/dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  }

  return (
    <div className="login-container">
      <div className='overlay'>

        <img src='https://cdn.animaapp.com/projects/655095d12540041bb7fc124b/releases/6553817a4281e83eb09235a4/img/profile@2x.png' alt="profile" />
        <div>
          <h2 style={{ float: 'left' }}>Sign In </h2>
          <div className="mb-3 width300">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3 width300">
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <span color='blue'>Forget password?</span>
          </div>
          <button className="btn btn-primary btn-lg btn-block width300" onClick={handleLoginClick}>
            Login
          </button>
          {error && <p className="text-danger">{error}</p>}
        </div>

      </div>
    </div>
  )
}

export default Login;