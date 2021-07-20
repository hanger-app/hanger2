import styled from 'styled-components';

export const LandingStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  object-fit: cover;
  vertical-align: baseline;
  & .subheading {
    position: absolute;
    margin-top: 10rem;
  }
  & body {
    background-color: grey;
  }
  & google {
    position: relative;
  }
`;
