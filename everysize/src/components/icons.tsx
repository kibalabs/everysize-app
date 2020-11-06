import React from 'react';
import styled from 'styled-components';

interface IBaseIconProps {
  svgContent: string;
  contentOriginX: number;
  contentOriginY: number;
  contentHeight: number;
  contentWidth: number;
}

const StyledBaseIcon = styled.svg`
  fill: currentColor;
  width: 100%;
  height: 100%;
`;


export const BaseIcon = (props: IBaseIconProps): React.ReactElement => {
  return (
    <StyledBaseIcon
      viewBox={`${props.contentOriginX} ${props.contentOriginY} ${props.contentHeight} ${props.contentWidth}`}
      width={props.contentWidth}
      height={props.contentHeight}
      dangerouslySetInnerHTML={{ __html: props.svgContent }}
    />
  );
};

BaseIcon.defaultProps = {
  contentOriginX: 0,
  contentOriginY: 0,
};

export const CloseIcon = (): React.ReactElement => {
  return (
    <BaseIcon
      contentWidth={24}
      contentHeight={24}
      svgContent='<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>'
    />
  );
}

export const AddIcon = (): React.ReactElement => {
  return (
    <BaseIcon
      contentWidth={24}
      contentHeight={24}
      svgContent='<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/>'
    />
  );
}

export const DragHandleIcon = (): React.ReactElement => {
  return (
    <BaseIcon
      contentWidth={24}
      contentHeight={24}
      svgContent='<path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>'
    />
  );
}

export const TwitterIcon = (): React.ReactElement => {
  return (
    <BaseIcon
      contentWidth={400}
      contentHeight={400}
      svgContent='<path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/>'
    />
  );
}
