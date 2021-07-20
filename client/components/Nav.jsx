import React from 'react';
import { NavStyle } from '../styles/NavStyle';

const Nav = () => {
  return (
    <NavStyle>
      <nav className="navBar">
        <a href="/">
          <img
            className="logo"
            src="https://res.cloudinary.com/dfu8r9blo/image/upload/v1606164894/Hanger2/HangerTextLogo_qnxaho.png"
            alt="hanger-logo"
          />
        </a>
        <a id="about" href="#">
          About
        </a>
      </nav>
    </NavStyle>
  );
};

export default Nav;
