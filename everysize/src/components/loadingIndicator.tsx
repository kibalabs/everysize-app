import React from 'react';
import styled from 'styled-components';

const StyledLoadingIndicator = styled.div`
  .indicator {
    display: inline-block;
    position: relative;
    height: 50px;
    width: 35px;
  }
  .indicator div {
    display: inline-block;
    position: absolute;
    width: 5px;
    background: rgba(255, 255, 255, 0.5);
    animation: indicator 1.5s cubic-bezier(0, 0.1, 0.25, 1) infinite;
    border-radius: 4px;
  }
  .indicator div:nth-child(1) {
    left: 0px;
    animation-delay: -0.3s;
  }
  .indicator div:nth-child(2) {
    left: 15px;
    animation-delay: -0.15s;
  }
  .indicator div:nth-child(3) {
    left: 30px;
    animation-delay: 0;
  }
  @keyframes indicator {
    0% {
      top: 0px;
      height: 50px;
    }
    50%, 100% {
      top: 15px;
      height: 15px;
    }
  }
`;

export const LoadingIndicator = (): React.ReactElement => {
  return (
    <StyledLoadingIndicator>
      <div className='indicator'>
        <div></div><div></div><div></div>
      </div>
    </StyledLoadingIndicator>
  );
}
