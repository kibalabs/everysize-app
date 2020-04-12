import React from 'react';
import styled from 'styled-components';

interface IStyledGridBackgroundProps {
  paddingSize: number;
  columnWidth: number;
  rowHeight: number;
}

const StyledGridBackground = styled.div<IStyledGridBackgroundProps>`
  height: ${(props: IStyledGridBackgroundProps): string => `calc(100% - 2 * ${props.paddingSize}px)`};
  width: ${(props: IStyledGridBackgroundProps): string => `calc(100% - 2 * ${props.paddingSize}px)`};
  position: absolute;
  transition: 0.3s;
  padding: ${(props: IStyledGridBackgroundProps): string => `${props.paddingSize}px`};
`;

const GridBackgroundInner = styled.div<IStyledGridBackgroundProps>`
  height: 100%;
  width: 100%;
  background-image: radial-gradient(circle, #bbb 1px, transparent 0.5px);
  background-size: ${(props: IStyledGridBackgroundProps): string => `${props.paddingSize}px ${props.paddingSize}px`};
  background-position: 4px 4px;
  box-sizing: border-box;
  border: #bbb 1px solid;
  overflow: hidden;
`;

const GridBackgroundInnerInner = styled.div<IStyledGridBackgroundProps>`
  height: 100%;
  width: 100%;
  background-image: radial-gradient(circle, #fff 10px, transparent 0px);
  background-size: 30px 30px;
  background-position: -1px -1px;
`;

interface IGridBackgroundProps {
  paddingSize: number;
  columnWidth: number;
  rowHeight: number;
}

export const GridBackground = (props: IGridBackgroundProps): React.ReactElement => {
  return (
    <StyledGridBackground paddingSize={props.paddingSize} rowHeight={props.rowHeight} columnWidth={props.columnWidth}>
      <GridBackgroundInner paddingSize={props.paddingSize} rowHeight={props.rowHeight} columnWidth={props.columnWidth}>
        <GridBackgroundInnerInner paddingSize={props.paddingSize} rowHeight={props.rowHeight} columnWidth={props.columnWidth}></GridBackgroundInnerInner>
      </GridBackgroundInner>
    </StyledGridBackground>
  )
};
