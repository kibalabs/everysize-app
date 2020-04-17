import React from 'react';
import styled from 'styled-components';

import { WebView } from './webView';
import { GridItemTitle } from './gridItemTitle';
import { LoadingIndicator } from './loadingIndicator';

const ErrorView = styled.div`
  width: 100%;
  flex-grow: 10;
  line-height: 2em;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  flex-direction: column;
`;

const LoadingView = styled.div`
  width: 100%;
  flex-grow: 1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IStyledGridItemProps {
  minimumWidth: number;
}

const StyledGridItem = styled.div<IStyledGridItemProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: ${(props: IStyledGridItemProps): string => `${props.minimumWidth}px`};;
  align-items: center;
`;

interface IGridItemChildrenHolderProps {
  height: number;
  width: number;
  zoom: number;
  isWebViewLoaded: boolean;
}

const GridItemChildrenHolder = styled.div<IGridItemChildrenHolderProps>`
  height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
  /* Min and max set here to make it work in firefox :( */
  min-height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
  max-height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
  width: ${(props: IGridItemChildrenHolderProps): string => `${props.width}px`};
  transform-origin: 50% 0%;
  transform: ${(props: IGridItemChildrenHolderProps): string => `scale(${props.zoom})`};
  display: ${(props: IGridItemChildrenHolderProps): string => props.isWebViewLoaded ? 'block' : 'none'};
`;

interface IGridItemChildrenHolderInnerProps {
  heightOffset: number;
  widthOffset: number;
}

const GridItemChildrenHolderInner = styled.div<IGridItemChildrenHolderInnerProps>`
  height: ${(props: IGridItemChildrenHolderInnerProps): string => `calc(100% + ${props.heightOffset}px)`};
  width: ${(props: IGridItemChildrenHolderInnerProps): string => `calc(100% + ${props.widthOffset}px)`};
  overflow: hidden;
`;

interface IGridItemProps {
  itemId: string;
  url: string | null;
  initialHeight: number;
  initialWidth: number;
  initialZoom: number;
  initialDeviceCode: string | null;
  minimumWidth: number;
  columnWidth: number;
  rowHeight: number;
  paddingSize: number;
  dragHandleClass?: string;
  isIframeBlocked: boolean;
  onCloseClicked: (itemId: string) => void;
  onSizeChanged: (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => void;
}

export const GridItem = (props: IGridItemProps): React.ReactElement => {
  const [height, setHeight] = React.useState<number>(props.initialHeight);
  const [width, setWidth] = React.useState<number>(props.initialWidth);
  const [zoom, setZoom] = React.useState<number>(props.initialZoom);
  const [isWebViewLoaded, setIsWebViewLoaded] = React.useState<boolean>(false);

  const onSizeChanged = (height: number, width: number, zoom: number, deviceCode: string | null): void => {
    setHeight(height);
    setWidth(width);
    setZoom(zoom);
    props.onSizeChanged(props.itemId, width, height, zoom, deviceCode);
  };

  const onCloseClicked = (): void => {
    props.onCloseClicked(props.itemId);
  };

  const onWebViewLoaded = (isLoading: boolean): void => {
    setIsWebViewLoaded(!isLoading);
  }

  return (
    <StyledGridItem minimumWidth={props.minimumWidth}>
      <GridItemTitle
        initialHeight={props.initialHeight}
        initialWidth={props.initialWidth}
        initialDeviceCode={props.initialDeviceCode}
        initialZoom={props.initialZoom}
        onSizeChanged={onSizeChanged}
        onCloseClicked={onCloseClicked}
        dragHandleClass={props.dragHandleClass}
      />
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      { props.isIframeBlocked && <ErrorView>{props.url} doesn't suppport iframes which we use to protect you 🔒<br /><br />If you're developing it, use localhost and everything should work 👌</ErrorView>}
      { !props.isIframeBlocked && !isWebViewLoaded && <LoadingView><LoadingIndicator /></LoadingView>}
      { !props.isIframeBlocked && (
        <GridItemChildrenHolder
          width={width}
          height={height}
          zoom={1.0 / zoom}
          isWebViewLoaded={isWebViewLoaded}
        >
          <GridItemChildrenHolderInner heightOffset={0} widthOffset={0}>
            {props.url ? (
              <WebView
                url={props.url}
                errorView={<div>Error</div>}
                onLoaded={onWebViewLoaded}
              />
            ) : ''}
          </GridItemChildrenHolderInner>
        </GridItemChildrenHolder>
      )}
    </StyledGridItem>
  );
}

GridItem.defaultProps = {
  initialHeight: 100,
  initialWidth: 100,
  minimumWidth: 100,
  initialZoom: 1,
};
