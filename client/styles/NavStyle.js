import styled from 'styled-components';

export const NavStyle = styled.div`
  display: inline-block;
  height: 15vh;
  min-height: 14vh;
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 99vw;
  background-color: #fff;
  color: black;
  // border-bottom: 1px solid #e6e2df;
  z-index: 1010;
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
    flex-wrap: wrap;
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
