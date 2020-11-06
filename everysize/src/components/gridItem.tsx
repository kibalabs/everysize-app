import React from 'react';
import styled from 'styled-components';

import { GridItemTitle } from './gridItemTitle';
import { LoadingSpinner, Stack, Alignment, Box, Direction, HidingView, ColorSettingView, WebView, Text, PaddingSize, ResponsiveTextAlignmentView, TextAlignment } from '@kibalabs/ui-react';

interface IGridItemChildrenHolderProps {
  height: number;
  width: number;
  zoom: number;
}

const GridItemChildrenHolder = styled.div<IGridItemChildrenHolderProps>`
  height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
  width: ${(props: IGridItemChildrenHolderProps): string => `${props.width}px`};
  transform: ${(props: IGridItemChildrenHolderProps): string => `scale(${props.zoom})`};
  transform-origin: 0% 0%;
  /* Min and max height set to make it work in firefox :( */
  min-height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
  max-height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
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
    <ColorSettingView variant='inverse'>
      <Box variant='gridItem' isFullHeight={true} isFullWidth={true}>
        <Stack isFullHeight={true} isFullWidth={true} direction={Direction.Vertical} contentAlignment={Alignment.Center} childAlignment={Alignment.Center}>
          <Stack.Item growthFactor={0} shrinkFactor={0}>
            <GridItemTitle
              initialHeight={props.initialHeight}
              initialWidth={props.initialWidth}
              initialDeviceCode={props.initialDeviceCode}
              initialZoom={props.initialZoom}
              onSizeChanged={onSizeChanged}
              onCloseClicked={onCloseClicked}
              dragHandleClass={props.dragHandleClass}
            />
          </Stack.Item>
          <Stack.Item growthFactor={1} />
          <HidingView isHidden={!props.isIframeBlocked}>
            <Box maxWidth='400px'>
              <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
                <Stack direction={Direction.Vertical} paddingHorizontal={PaddingSize.Wide3} defaultGutter={PaddingSize.Wide} contentAlignment={Alignment.Center} childAlignment={Alignment.Center} shouldAddGutters={true}>
                  <Text variant='large-error'>Oh no!</Text>
                  <Text variant='small'>{props.url} doesn't support iframes, which we use to ensure your privacy 🔒<br />If you're developing it, use localhost and everything should work 👌</Text>
                </Stack>
              </ResponsiveTextAlignmentView>
            </Box>
          </HidingView>
          <HidingView isHidden={props.isIframeBlocked || isWebViewLoaded}>
            <LoadingSpinner variant='light'/>
          </HidingView>
          <HidingView isHidden={props.isIframeBlocked}>
            <Box isFullWidth={false} width={`calc(${width}px * 1.0 / ${zoom})`} height={isWebViewLoaded ? `calc(${height}px * 1.0 / ${zoom})` : '0'}>
              <GridItemChildrenHolder
                width={width}
                height={height}
                zoom={1.0 / zoom}
              >
                <WebView
                  url={props.url}
                  errorView={<div>Error</div>}
                  shouldShowLoadingSpinner={false}
                  onLoadingChanged={onWebViewLoaded}
                />
              </GridItemChildrenHolder>
            </Box>
          </HidingView>
          <Stack.Item growthFactor={1} />
        </Stack>
      </Box>
    </ColorSettingView>
  );
}

GridItem.defaultProps = {
  initialHeight: 100,
  initialWidth: 100,
  minimumWidth: 100,
  initialZoom: 1,
};
