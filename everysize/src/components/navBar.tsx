import React from 'react';
import styled from 'styled-components';
import logo from '../assets/everysize-wordmark-dark.svg';
import favicon from '../assets/favicon.svg';


interface INavBar {
  url: string | null;
  onUrlChanged: (url: string) => void;
}

const StyledNavBar = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

const StyledInput = styled.input`
  min-width: 300px;
  border: #959595 1px solid;
  padding: 8px;
  height: 100%;
  border-radius: 4px;
`;

export const NavBar = (props: INavBar): React.ReactElement => {
  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onUrlChanged(event.target.value);
  };

  return (
    <StyledNavBar>
      <div>
        <img height='30px' width='30px' src={favicon} alt='logo'/>
        <img height='30px' width='170px' src={logo} alt='everypage'/>
      </div>
      <StyledInput
        value={props.url || ''}
        onChange={onUrlChanged}
      />
      <div />
      <div />
    </StyledNavBar>
  );
};
