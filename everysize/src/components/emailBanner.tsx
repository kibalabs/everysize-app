import React from 'react';
import styled from 'styled-components';
import { isValidEmail, Requester, RestMethod, KibaResponse } from '@kibalabs/core';

import { CloseIcon } from './icons';


interface IEmailBannerProps {
  onCloseClicked: () => void;
  onEmailSubmitted: () => void;
}


const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ErrorText = styled.div`
  color: red;
`;

const SuccessText = styled.div`
  color: green;
`;

const StyledText = styled.div`
  flex-grow: 1;
  line-height: 1.5em;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled.input`
  min-width: 200px;
  border: #959595 1px solid;
  padding: 5px 10px;
  height: 100%;
  border-radius: 4px;
  background-color: white;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  color: white;
  padding: 10px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-left: 5px;
  font-size: 0.6em;
  font-weight: bold;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const BannerInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledCloseButton = styled.button`
  color: #333333;
  padding: 5px;
  border-radius: 4px;
  width: 25px;
  height: 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  transition: 0.3s;

  :hover {
    background-color: #eeeeee;
  }

  :active {
    background-color: #dddddd;
  }
`;

const StyledEmailBanner = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  border-top: 1px solid #dddddd;
  transition: 0.3s;
`;

export const EmailBanner = (props: IEmailBannerProps): React.ReactElement => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string>('');

  const onEmailInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
    setErrorMessage(null);
  };

  const onFormSubmitted = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    new Requester().makeRequest(RestMethod.POST, 'https://api.kiba.dev/v1/newsletter-subscriptions', {email: email, topic: 'everysize'}).then((response: KibaResponse) => {
      setSuccessMessage('You\'re all signed up. Have fun!')
      setTimeout(function() {
        props.onEmailSubmitted();
      }, 3000)
    }).catch((error: Error): void => {
      setErrorMessage(error.message);
    });
  }

  const onCloseClicked = (): void => {
    props.onCloseClicked();
  }

  return (
    <StyledEmailBanner className='emailBanner'>
      <div />
      <BannerInner>
        <StyledText>Sign up to hear about our upcoming products 🚀<br/>We don't spam and you can unsubscribe any time 👌</StyledText>
        <FormWrapper>
          <StyledForm onSubmit={onFormSubmitted}>
            <StyledInput type='text' name='email' placeholder='awesome@dev.com' value={email} onChange={onEmailInputChanged}/>
            <SubmitButton type='submit'>SUBMIT</SubmitButton>
          </StyledForm>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          {successMessage && <SuccessText>{successMessage}</SuccessText>}
        </FormWrapper>
      </BannerInner>
      <StyledCloseButton onClick={onCloseClicked}><CloseIcon /></StyledCloseButton>
    </StyledEmailBanner>
  );
};
