import React from 'react';
import { NavStyle } from './NavStyle';

const Nav = () => {
  return (
    <NavStyle>
      <nav className="navBar">
        <a href="/">
          <img className="logo" src="/assets/HangerTextLogo.png" alt="hanger-logo" />
        </a>
        <a id="about" href="#">
          About
        </a>
      </nav>
    </NavStyle>
  );
};

export default Nav;
