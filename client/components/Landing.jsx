import React from 'react';
import GoogleButton from 'react-google-button';
import { LandingStyle } from '../styles/LandingStyle';
//import LandingStyle component
export default Landing = () => {
  return (
    <LandingStyle>
      <div className="coverBlock">
        <img
          className="logo"
          src="https://res.cloudinary.com/dfu8r9blo/image/upload/v1626811153/Hanger2/HangerBackground_midajr.png"
          alt="hangerLogo"
        />
        <div className="logBlock">
          <h1 className="subheading">A new way to clean your closet</h1>
          <div className="google">
            <a href="/auth/google">
              <GoogleButton type="light" />
            </a>
          </div>
        </div>
        <br />
      </div>
    </LandingStyle>
  );
};
