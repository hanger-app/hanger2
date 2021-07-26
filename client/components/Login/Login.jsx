import React from 'react';
import GoogleButton from 'react-google-button';
import { LoginStyle } from './LoginStyle';
import { useAuth } from '../../contexts/AuthContext';
import { Link, Route } from 'react-router-dom';
const Login = () => {
  const user = useAuth()?.user;
  // if (user?.authenticated === true) {
  //   return < Route path='/closet' />;
  // }
  return (
    <LoginStyle>
      <div className="coverBlock">
        <img className="logo" src="/assets/HangerBackground.png" alt="hangerLogo" />
        <div className="logBlock">
          <h1 className="subheading">A new way to clean your closet</h1>
          <div className="google">
            <a href="/api/sessions/login" style={{ display: user?.authenticated ? 'none' : 'visible' }}>
              <GoogleButton type="dark" />
            </a>
          </div>
          <Link to="/closet">
            <button style={{ visibility: user?.authenticated ? 'visible' : 'hidden' }}>Enter Closet</button>
          </Link>
        </div>
        <br />
      </div>
    </LoginStyle>
  );
};

export default Login;
