import styled from 'styled-components';

export const LandingStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding: 24px 8px 0 8px;
  min-height: calc(100vh - 150px);
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  object-fit: cover;
  vertical-align: baseline;
  overflow-x: auto;
  & img {
    filter: brightness(40%);
    width: fit-content;
    height: 100%;
  }
  & .subheading {
    max-width: 15vw;
    color: white;
    font-size: 32px;
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  & .google:hover {
    color: green;
  }
  & .logBlock {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    position: absolute;
    top: 50%;
    padding-left: 5rem;
  }
`;
