import React from 'react';
import { NavStyle } from '../styles/NavStyle';

const Nav = () => {
  return (
    <NavStyle>
      <nav>
        <div>
          <a href="/">
            <img
              className="logo"
              src="https://res.cloudinary.com/dfu8r9blo/image/upload/v1606164894/Hanger2/HangerTextLogo_qnxaho.png"
              alt="hanger-logo"
            />
          </a>
        </div>
      </nav>
    </NavStyle>
  );
};

export default Nav;
