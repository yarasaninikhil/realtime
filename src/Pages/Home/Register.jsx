import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Client'; 
import './Register/Register.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false); 
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); 


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('Registration')
        .insert([{ email, name, password }]); 

      if (error) throw error;

      setErrorMessage('');
      setSuccessMessage('Registration successful!');
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      console.error('Registration Error:', err); 
      setErrorMessage(err.message);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/');
  };

  return (
    <>
    <div className="registerbody">
  
    <div className="auth-form">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder='Enter your Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder='Enter your Email'
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
            placeholder='Enter your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button className='register' type="submit">Register</button>
      </form>

      <button className='account' onClick={handleNavigateToLogin}>
        Already have an account? Login
      </button>

      {userDetails && (
        <div className="user-details">
          <h3>Welcome, {userDetails.email}</h3>
          <p>You are logged in.</p>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default Register;
