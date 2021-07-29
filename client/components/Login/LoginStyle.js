import styled from 'styled-components';

export const LoginStyle = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding: 24px 8px 0 8px;
  position: absolute;
  padding: 0;
  margin: 0;
  object-fit: cover;
  vertical-align: baseline;
  text-decoration: none;
  & img {
    filter: brightness(50%);
    max-width: 100%;
    height: auto;
  }
  & a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
  & .subheading {
    max-width: 15vw;
    color: white;
    font-size: 32px;
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    min-width: -webkit-fill-available;
  }
  & .google:hover {
    color: green;
  }
  & .logBlock {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    padding-left: 5rem;
  }
  & .coverBlock {
    display: flex;
    flex-direction: row;
  }
`;
