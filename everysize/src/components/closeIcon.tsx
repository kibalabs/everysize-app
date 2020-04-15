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
