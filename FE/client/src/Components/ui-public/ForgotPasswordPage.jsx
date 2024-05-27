import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add logic to handle password reset, e.g., send email to the server
    console.log('Email:', email);
    // Assuming the email submission is successful
    navigate('/create-new-password');
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleForgotPassword}>
        <h1>Forgot Password</h1>
        <div className="input-box">
          <input 
            type="email" 
            placeholder='Enter your email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
