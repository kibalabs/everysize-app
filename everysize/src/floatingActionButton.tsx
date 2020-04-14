import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

interface IFloatingActionButtonProps {
  onClicked: () => void;
}

const StyledButton = styled.button`
  color: white;
  background-color: #333333;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  position: absolute;
  right: 10px;
  bottom: 10px;
  text-align: center;

  :hover {
    background-color: ${darken(0.1, '#333333')};
  }

  :active {
    background-color: ${darken(0.2, '#333333')};
  }
`;

const addIconContent = '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/>';

const StyledIcon = styled.svg`
  fill: currentColor;
`;

export const FloatingActionButton = (props: IFloatingActionButtonProps): React.ReactElement | null => {
  const onClicked = (): void => {
    props.onClicked()
  }

  return (
    <StyledButton onClick={onClicked}>
      <StyledIcon
        height={24}
        width={24}
        dangerouslySetInnerHTML={{ __html: addIconContent }}
      />
    </StyledButton>
  );
}
