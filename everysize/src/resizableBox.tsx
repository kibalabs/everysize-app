import React from 'react';
import styled from 'styled-components';

interface IResizableBoxProps {
  children: React.ReactChild;
}

const StyledResizableBox = styled.div`
  height: 200px;
  width: 300px;
`;

export const ResizableBox = (props: IResizableBoxProps): React.ReactElement => {
  return <StyledResizableBox>{ props.children }</StyledResizableBox>
}
