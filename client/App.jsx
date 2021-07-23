import React from 'react';
import Landing from './components/Landing.jsx';
import Nav from './components/Nav.jsx';
import { MainStyle } from './styles/MainStyle';

const App = () => {
  return (
    <MainStyle>
      <Nav />
      <Landing />
    </MainStyle>
  );
};

export default App;
