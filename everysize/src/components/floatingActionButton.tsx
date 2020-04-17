import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { AddIcon } from './icons';

interface IFloatingActionButtonProps {
  onClicked: () => void;
}

const StyledButton = styled.button`
  color: white;
  background-color: #333333;
  height: 50px;
  width: 50px;
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  outline: none;
  position: absolute;
  right: 20px;
  bottom: 50px;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: ${darken(0.1, '#333333')};
  }

  :active {
    background-color: ${darken(0.2, '#333333')};
  }
`;

export const FloatingActionButton = (props: IFloatingActionButtonProps): React.ReactElement | null => {
  const onClicked = (): void => {
    props.onClicked()
  }

  return (
    <StyledButton onClick={onClicked}>
      <AddIcon />
    </StyledButton>
  );
}
