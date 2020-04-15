import React from 'react';
import styled from 'styled-components';

import { WebView } from './webView';
import { GridItemTitle } from './gridItemTitle';


interface IStyledGridItemProps {
  minimumWidth: number;
}

const StyledGridItem = styled.div<IStyledGridItemProps>`
  display: flex;
  flex-direction: column;
  min-width: ${(props: IStyledGridItemProps): string => `${props.minimumWidth}px`};;
  align-items: center;
`;

interface IGridItemChildrenHolderProps {
  height: number;
  width: number;
  zoom: number;
}

const GridItemChildrenHolder = styled.div<IGridItemChildrenHolderProps>`
  height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
  width: ${(props: IGridItemChildrenHolderProps): string => `${props.width}px`};
  transform-origin: 50% 0%;
  transform: ${(props: IGridItemChildrenHolderProps): string => `scale(${props.zoom})`};
  overflow: hidden;
`;

interface IGridItemChildrenHolderInnerProps {
  heightOffset: number;
  widthOffset: number;
}

const GridItemChildrenHolderInner = styled.div<IGridItemChildrenHolderInnerProps>`
  height: ${(props: IGridItemChildrenHolderInnerProps): string => `calc(100% + ${props.heightOffset}px)`};
  width: ${(props: IGridItemChildrenHolderInnerProps): string => `calc(100% + ${props.widthOffset}px)`};
`;

interface IGridItemProps {
  itemId: string;
  url: string | null;
  initialHeight: number;
  initialWidth: number;
  initialZoom: number;
  minimumWidth: number;
  columnWidth: number;
  rowHeight: number;
  paddingSize: number;
  onCloseClicked: (itemId: string) => void;
  onSizeChanged: (itemId: string, width: number, height: number, zoom: number) => void;
}

export const GridItem = (props: IGridItemProps): React.ReactElement => {
  const [height, setHeight] = React.useState<number>(props.initialHeight);
  const [width, setWidth] = React.useState<number>(props.initialWidth);
  const [zoom, setZoom] = React.useState<number>(props.initialZoom);

  const onHeightChanged = (height: number): void => {
    setHeight(height);
  };

  const onWidthChanged = (width: number): void => {
    setWidth(width);
  };

  const onZoomChanged = (zoom: number): void => {
    setZoom(zoom);
  };

  React.useEffect((): void => {
    props.onSizeChanged(props.itemId, width, height, zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.itemId, width, height, zoom]);

  const onCloseClicked = (): void => {
    props.onCloseClicked(props.itemId);
  };

  return (
    <StyledGridItem minimumWidth={props.minimumWidth}>
      <GridItemTitle
        initialHeight={props.initialHeight}
        initialWidth={props.initialWidth}
        initialZoom={props.initialZoom}
        onHeightChanged={onHeightChanged}
        onWidthChanged={onWidthChanged}
        onZoomChanged={onZoomChanged}
        onCloseClicked={onCloseClicked}
      />
      <GridItemChildrenHolder
        width={width}
        height={height}
        zoom={1.0 / zoom}
      >
        <GridItemChildrenHolderInner heightOffset={0} widthOffset={0}>
          {props.url ? (
            <WebView
              url={props.url}
              errorView={<div>Error</div>}
            />
          ) : ''}
        </GridItemChildrenHolderInner>
      </GridItemChildrenHolder>
    </StyledGridItem>
  );
}

GridItem.defaultProps = {
  initialHeight: 100,
  initialWidth: 100,
  minimumWidth: 100,
  initialZoom: 1,
};
