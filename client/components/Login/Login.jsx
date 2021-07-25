import React from 'react';
import GoogleButton from 'react-google-button';
import { LoginStyle } from './LoginStyle';

const Login = () => {
  // const authenticate = () => {
  //   fetch('/api/sessions/login');
  // };
  return (
    <LoginStyle>
      <div className="coverBlock">
        <img
          className="logo"
          src="https://res.cloudinary.com/dfu8r9blo/image/upload/v1626811153/Hanger2/HangerBackground_midajr.png"
          alt="hangerLogo"
        />
        <div className="logBlock">
          <h1 className="subheading">A new way to clean your closet</h1>
          <div className="google">
            {/* <GoogleButton type="dark" onClick={authenticate} /> */}
            <a href="/api/sessions/login">
              <GoogleButton type="dark" />
            </a>
          </div>
        </div>
        <br />
      </div>
    </LoginStyle>
  );
};

export default Login;
