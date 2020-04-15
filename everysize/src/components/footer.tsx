import React from 'react';
import styled from 'styled-components';


interface IFooterProps {
}

const TextHolder = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;

const Link = styled.a`
  color: rgba(255, 255, 255, 0.8);

  :hover {
    color: rgba(255, 255, 255, 0.9);
  }

  :active {
    color: rgba(255, 255, 255, 1);
  }
`;

const StyledFooter = styled.div`
  width: 100%;
  background-color: #333333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;

export const Footer = (props: IFooterProps): React.ReactElement => {
  return (
    <StyledFooter>
      <div />
      <TextHolder>Made by <Link href='https://www.kibalabs.com'>Kiba Labs</Link></TextHolder>
      <div />
    </StyledFooter>
  );
};
