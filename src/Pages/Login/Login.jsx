import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Client';
import Video from "../../Component/assets/Loginvideo.mp4";
import { GoogleLogin } from '@react-oauth/google'; 
import { jwtDecode } from 'jwt-decode';
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const { data: adminData, error: adminError } = await supabase
        .from('Admin') 
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (adminData) {
       
        localStorage.setItem('user', JSON.stringify(adminData));
        navigate('/AdminHome');
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('Registration') 
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (userData) {
   
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/home'); 
        return;
      }

      setErrorMessage('Invalid email or password.');

    } catch (err) {
      console.error('Login Error:', err);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);

      const { data: userData, error: userError } = await supabase
        .from('Registration') 
        .select('*')
        .eq('email', decoded.email)
        .single();

      if (userData) {
       
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/home'); 
      } else {
        setErrorMessage('User not registered with this email.');
      }

    } catch (error) {
      console.log('Google login failed', error);
      setErrorMessage('Google login failed, please try again');
    }
  };

  return (
    <div className="login">
      <div className="videoclip">
        <video src={Video} autoPlay loop muted />
      </div>

      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder='Enter your email'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p>
            Forgot the password?{' '}
            <a href="#" onClick={() => navigate('/forgot-password')}>
              Click here
            </a>
          </p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="sign">
            <button className='Login' type="submit">Login</button>
            <button
              className="sig"
              type="button"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        </form>

      
        <div className="google-login-container">
      <GoogleLogin
        className="google-login-button"
        onSuccess={handleGoogleLogin}
        onFailure={() => {
          console.log('Login Failed');
          setErrorMessage('Google login failed, please try again');
        }}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
    </div>
    </div>
  );
};

export default Login;
