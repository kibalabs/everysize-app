import React from 'react';
import styled from 'styled-components';

interface IStyledGridBackgroundProps {
  paddingSize: number;
  columnWidth: number;
  rowHeight: number;
}

const StyledGridBackground = styled.div<IStyledGridBackgroundProps>`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: -1;
  transition: 0.3s;
  opacity: 0.4;
  background-image: radial-gradient(circle, #aaa 1px, transparent 1px);
  background-size: ${(props: IStyledGridBackgroundProps): string => `${props.paddingSize}px ${props.paddingSize}px`};
  background-position: 4px 4px;
  box-sizing: border-box;
  border: #aaa 1px solid;
  overflow: hidden;
  background-color: white;
`;

const GridBackgroundInnerInner = styled.div`
  height: 100%;
  width: 100%;
  background-image: radial-gradient(circle, #fff 10px, transparent 0px);
  background-size: 30px 30px;
  background-position: 10px 10px;
`;

interface IGridBackgroundProps {
  paddingSize: number;
  columnWidth: number;
  rowHeight: number;
}

export const GridBackground = (props: IGridBackgroundProps): React.ReactElement => {
  return (
    <StyledGridBackground paddingSize={props.paddingSize} rowHeight={props.rowHeight} columnWidth={props.columnWidth}>
      <GridBackgroundInnerInner />
    </StyledGridBackground>
  )
};
