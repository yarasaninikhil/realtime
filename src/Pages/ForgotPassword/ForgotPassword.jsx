import  { useState } from 'react';
import { supabase } from '../../Client'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      
      if (error) throw error;
     
      const generatedOtp = '123456'; 
      
      localStorage.setItem('otp', generatedOtp);
      
      setOtpSent(true);
      setErrorMessage('');
      setSuccessMessage('OTP sent to your email. Please check your inbox.');
    } catch (err) {
      console.error('Password Reset Error:', err);
      setErrorMessage(err.message);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    const storedOtp = localStorage.getItem('otp');

    if (otp !== storedOtp) {
      setErrorMessage('Invalid OTP.');
      return;
    }

    try {
      const { error } = await supabase.auth.update({ password: newPassword });
      
      if (error) throw error;
      
      setErrorMessage('');
      setSuccessMessage('Password reset successful!');
      setOtp('');
      setNewPassword('');
      localStorage.removeItem('otp');
    } catch (err) {
      console.error('Password Update Error:', err);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Forgot Password</h2>
      {!otpSent ? (
        <form onSubmit={handlePasswordReset}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerification}>
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
