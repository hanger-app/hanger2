import styled from 'styled-components';

export const LandingStyle = styled.div`
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
