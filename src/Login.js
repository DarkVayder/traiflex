import React, { useState } from 'react';
import "./Login.css";
import loginImage from './Netflix logo.png';
import { login, signup } from './Firebase'; 
import loadingGif from "./loading.gif"; 

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    loading ? (
      <div className="loading">
        <img src={loadingGif} alt="Loading" />
      </div>
    ) : (
      <div className='Login'>
        <img src={loginImage} alt="Login" />
        <div className='Login-form'>
          <h1>{signState}</h1>
          <form onSubmit={userAuth}>
            {signState === 'Sign Up' && (
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type='text' 
                placeholder='Your Name' 
              />
            )}
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type='email' 
              placeholder='Email' 
            />
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type='password' 
              placeholder='Password' 
            />
            <button type='submit'>{signState}</button>
            <div className='form-help'>
              <div className='remember'>
                <input type='checkbox' id='rememberMe' />
                <label htmlFor='rememberMe'>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className='form-switch'> 
            {signState === 'Sign In' ? (
              <p>New to Netflix? <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setSignState('Sign In')}>Sign In Now</span></p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Login;
