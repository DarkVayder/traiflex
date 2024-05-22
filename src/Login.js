import React, { useState } from 'react';
import "./Login.css";
import loginImage from './Netflix logo.png';

const Login = () => {

  const[signState, setSignState] = useState('Sign In')
  
  return (
    <div className='Login'>
      <img src={loginImage} alt="Login" />
      <div className='Login-form'>
        <h1>{signState}</h1>
        <form>
          {signState === 'Sign Up' ? <input type='text' placeholder='Your Name' /> :<></>}
          
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button>{signState}</button>
          <div className='form-help'>
            <div type='remember Me'>
              <input type='checkbox' />
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className='form-switch'> 
        {signState ==='Sign In' ? <p>New to Netflix? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p> :<></>}
        <p>Already have an account? <span> onClick={()=>{setSignState('Sign In')}}Sign In Now</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login;
