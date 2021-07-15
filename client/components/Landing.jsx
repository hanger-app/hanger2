import React from 'react';
import GoogleButton from 'react-google-button';
import { LandingStyle } from '../styles/LandingStyle';

export default function Landing() {
  return (
    <LandingStyle>
      <img
        className="logo"
        src="https://res.cloudinary.com/dfu8r9blo/image/upload/v1606164894/HangerImages/HangerTextLogo_qnxaho.png"
        alt="hangerLogo"
      />
      <h1 className="subheading">A new way to clean your closet</h1>
      <div id="google">
        <a href="/auth/google">
          <GoogleButton type="light" />
        </a>
      </div>
      <br />
    </LandingStyle>
  );
}
