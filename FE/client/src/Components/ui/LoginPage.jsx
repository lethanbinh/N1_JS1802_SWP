import React from 'react'
import './LoginPage.css'
import { FaUser, FaLock } from "react-icons/fa"

export const LoginPage = () => {
  return (
    <div className='wrapper'>
        <form action = "">
            <h1>Login</h1>
            <div className="input-box">
                <input type = "text" placeholder='Username' required />
                <FaUser className='icon'/>
            </div>
            <div className="input-box">
                <input type = "password" placeholder='Password' required />
                <FaLock className='icon'/>
            </div>
            <div className="remember-forgot">
                <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
        </form>

    </div>
  )
}

export default LoginPage