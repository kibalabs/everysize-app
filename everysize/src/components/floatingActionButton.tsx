import React from 'react';
import styled from 'styled-components';
import { KibaIcon } from '@kibalabs/ui-react';

interface IFloatingActionButtonProps {
  bottomOffset: string;
  onClicked: () => void;
}

interface IStyledButtonProps {
  bottomOffset: string;
}

// TODO(krishan711): think about how this can be represented in ui-react
const StyledButton = styled.button<IStyledButtonProps>`
  color: white;
  background-color: #333333;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  outline: none;
  position: absolute;
  right: 20px;
  bottom: ${(props: IStyledButtonProps): string => `calc(20px + ${props.bottomOffset})`};
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: #1a1a1a;
  }

  :active {
    background-color: #000000;
  }
`;

export const FloatingActionButton = (props: IFloatingActionButtonProps): React.ReactElement | null => {
  const onClicked = (): void => {
    props.onClicked()
  }

  return (
    <StyledButton bottomOffset={props.bottomOffset} onClick={onClicked}>
      <KibaIcon variant='large' iconId='ion-add' />
    </StyledButton>
  );
}
FloatingActionButton.defaultProps = {
  bottomOffset: '0px',
}
