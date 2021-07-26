import styled from 'styled-components';

export const NavStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 61px;
  min-width: 99vw;
  background-color: #fff;
  color: black;
  z-index: 50;
  font-family: sans-serif;
  & .logo {
    width: 10rem;
    padding-left: 4rem;
  }
  & .navBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  & #about {
    margin-right: 2rem;
    text-decoration: none;
    color: black;
  }
  & #about:hover {
    color: grey;
  }
`;
