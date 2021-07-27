import React from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { LoginStyle } from './LoginStyle';
import { useAuth } from '../../contexts/AuthContext';
import ConditionalShow from '../library/ConditionalShow.jsx';

const Login = () => {
  const auth = useAuth();

  const authenticated = auth?.user?.authenticated;

  return (
    <LoginStyle>
      <div className="coverBlock">
        <img className="logo" src="/assets/HangerBackground.png" alt="hangerLogo" />
        <div className="logBlock">
          <h1 className="subheading">A new way to clean your closet</h1>
          <div className="google">
            <ConditionalShow condition={!authenticated}>
              <a href="/api/sessions/login">
                <GoogleButton type="dark" />
              </a>
            </ConditionalShow>
          </div>
          <ConditionalShow condition={authenticated}>
            <Link to="/closet">
              <button>Enter Closet</button>
            </Link>
          </ConditionalShow>
        </div>
        <br />
      </div>
    </LoginStyle>
  );
};

export default Login;
