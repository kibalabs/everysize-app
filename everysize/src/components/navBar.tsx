import React from 'react';
import styled from 'styled-components';
import { TwitterIcon } from './icons';


interface INavBarProps {
  url: string;
  onUrlChanged: (url: string) => void;
  onTwitterShareClicked: () => void;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const TwitterButton = styled.button`
  color: white;
  height: 30px;
  width: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-left: 5px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const GoButton = styled.button`
  color: white;
  padding: 10px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-left: 5px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const StyledNavBar = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
`;

const StyledInput = styled.input`
  min-width: 300px;
  border: #959595 1px solid;
  padding: 8px 10px;
  height: 100%;
  border-radius: 4px;
  background-color: white;
`;

export const NavBar = (props: INavBarProps): React.ReactElement => {
  const [url, setUrl] = React.useState<string>(props.url);

  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  const onTwitterShareClicked = (): void => {
    props.onTwitterShareClicked();
  };

  const onFormSubmitted = (event: React.FormEvent<HTMLFormElement>): void => {
    var newUrl = url;
    if (!newUrl.startsWith('http')) {
      newUrl = newUrl.startsWith('localhost') ? `http://${url}` : `https://${url}`;
      setUrl(newUrl);
    }
    props.onUrlChanged(newUrl);
    event.preventDefault();
  }

  return (
    <StyledNavBar>
      <div>
        <img height='30px' width='30px' src='/assets/favicon.svg' alt='logo'/>
        <img height='30px' width='170px' src='/assets/everysize-wordmark-dark.svg' alt='everypage'/>
      </div>
      <StyledForm onSubmit={onFormSubmitted}>
        <StyledInput
          value={url || ''}
          onChange={onUrlChanged}
        />
        <GoButton type='submit'>GO</GoButton>
      </StyledForm>
      <div />
      <TwitterButton onClick={onTwitterShareClicked}><TwitterIcon /></TwitterButton>
    </StyledNavBar>
  );
};
