import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './CreateNewPasswordPage.css';

const CreateNewPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleCreateNewPassword = (e) => {
    e.preventDefault();
    // Add logic to handle new password creation
    console.log('New Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Redirect to login page after password creation
    navigate('/');
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleCreateNewPassword}>
        <h1>Create New Password</h1>
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Enter new password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Confirm new password' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateNewPasswordPage;
