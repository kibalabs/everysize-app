import React from 'react';
import styled from 'styled-components';

const getResizability = (isHorizontallyResizable: boolean, isVerticallyResizable: boolean): string => {
  if (isHorizontallyResizable && isVerticallyResizable) {
    return 'both';
  }
  if (isHorizontallyResizable) {
    return 'horizontal';
  }
  if (isVerticallyResizable) {
    return 'vertical';
  }
  return 'none';
}

interface IStyledResizableBoxProps {
  initialHeight: string;
  initialWidth: string;
  minimumHeight: string;
  minimumWidth: string;
  maximumHeight?: string;
  maximumWidth?: string;
  isHorizontallyResizable: boolean;
  isVerticallyResizable: boolean;
}

const StyledResizableBox = styled.div<IStyledResizableBoxProps>`
  resize: ${(props: IStyledResizableBoxProps): string => getResizability(props.isHorizontallyResizable, props.isVerticallyResizable)};
  overflow: auto;
  height: ${(props: IStyledResizableBoxProps): string => props.initialHeight};
  width: ${(props: IStyledResizableBoxProps): string => props.initialWidth};
  min-height: ${(props: IStyledResizableBoxProps): string => props.minimumHeight};
  min-width: ${(props: IStyledResizableBoxProps): string => props.minimumWidth};
  ${(props: IStyledResizableBoxProps): string => (props.maximumHeight ? `max-height: ${props.maximumHeight}` : '')};
  ${(props: IStyledResizableBoxProps): string => (props.maximumWidth ? `max-height: ${props.maximumWidth}` : '')};
`;

interface IResizableBoxProps {
  initialHeight: string;
  initialWidth: string;
  minimumHeight: string;
  minimumWidth: string;
  maximumHeight?: string;
  maximumWidth?: string;
  isHorizontallyResizable: boolean;
  isVerticallyResizable: boolean;
  children: React.ReactChild;
}

export const ResizableBox = (props: IResizableBoxProps): React.ReactElement => {
  return (
    <StyledResizableBox
      className='resizable-box'
      initialHeight={props.initialHeight}
      initialWidth={props.initialWidth}
      minimumHeight={props.minimumHeight}
      minimumWidth={props.minimumWidth}
      maximumHeight={props.maximumHeight}
      maximumWidth={props.maximumWidth}
      isHorizontallyResizable={props.isHorizontallyResizable}
      isVerticallyResizable={props.isVerticallyResizable}
    >
      { props.children }
    </StyledResizableBox>
  );
}

ResizableBox.defaultProps = {
  initialHeight: '100%',
  initialWidth: '100%',
  minimumHeight: '250px',
  minimumWidth: '250px',
  isHorizontallyResizable: true,
  isVerticallyResizable: true,
};
