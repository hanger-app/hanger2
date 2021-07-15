import React from 'react';
import styled from 'styled-components';
import GoogleButton from 'react-google-button';

const LandingStyle = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  & .logo {
    width: 80%;
    height: 80%;
  }

  & .subheading {
    position: absolute;
    margin-top: 10rem;
  }
  & body {
    background-color: grey;
  }
`;
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
