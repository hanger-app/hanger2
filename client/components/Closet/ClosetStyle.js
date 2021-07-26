import styled from 'styled-components';

export const ClosetStyle = styled.div`
  width: auto;
  margin-top: 5rem;
  }
`;

export const PopOverStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: auto;
  background-color: #424242;
  color: #e8a832;

  & .formLabel {
    display: flex;
    flex-direction: column;
    width: 21vw;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  & #submit {
    width: auto;
  }
  & .itemForm {
    margin-bottom: 2rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;
