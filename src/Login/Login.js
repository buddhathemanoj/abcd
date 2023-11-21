import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
      console.log("Attempting login...");

      const user = await login({ email, password });
      console.log("User data:", user);

      dispatch({ type: 'LOGIN', payload: user });

      // const accessToken = JSON.stringify(user);
      // Cookies.set("accessToken", accessToken, { expires: 1 });
      // const storedAccessToken = Cookies.get("accessToken");
      // const aser = storedAccessToken ? JSON.parse(storedAccessToken) : null;
      // console.log("cookies",aser);

      localStorage.setItem('user', JSON.stringify(user));

      console.log("User role:", user.role);

      if (user.role === "admin" || user.role === "employee") {
        console.log("Navigating to /dashboard");
        navigate('/dashboard');
      } else if (user.role === "user") {
        console.log("Navigating to /user-dashboard");
        navigate('/user-dashboard');
      } else {
        console.log("Navigating to /");
        navigate('/');
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


            <Link to='/forget-password' style={{color:'blue'}}>Forget password?</Link>       

            {/* <Link to='/forget-password' style={{ color: 'blue' }}>Forget password?</Link>


            <span color='blue'>Forget password?</span> */}


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