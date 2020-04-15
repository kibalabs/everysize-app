import React from 'react';
import styled from 'styled-components';

import { IDevice, devices } from '../model/devices';
import { WebView } from './webView';

const StyledInput = styled.input`
  height: 25px;
  background: none;
  border: none;
  border-bottom: white 1px solid;
  color: white;
  padding-left: 8px;
  padding-right: 8px;
  width: 30px;
  text-align: center;
`;

interface IStyledGridItemProps {
  minimumWidth: number;
}

const StyledGridItem = styled.div<IStyledGridItemProps>`
  display: flex;
  flex-direction: column;
  min-width: ${(props: IStyledGridItemProps): string => `${props.minimumWidth}px`};;
  align-items: center;
`;

const GridItemTitle = styled.div`
  width: 100%;
  min-height: 50px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const StyledCloseButton = styled.button`
  background-color: #555555;
  color: white;
  padding: 5px 10px;
`;

const SizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  minimumWidth: number;
  initialZoom: number;
  columnWidth: number;
  rowHeight: number;
  paddingSize: number;
  onCloseClicked: (itemId: string) => void;
  onSizeChanged: (itemId: string, width: number, height: number, zoom: number) => void;
}

export const GridItem = (props: IGridItemProps): React.ReactElement => {
  const [heightInput, setHeightInput] = React.useState<string>(String(props.initialHeight));
  const [height, setHeight] = React.useState<number>(props.initialHeight);
  const [widthInput, setWidthInput] = React.useState<string>(String(props.initialWidth));
  const [width, setWidth] = React.useState<number>(props.initialWidth);
  const [zoomInput, setZoomInput] = React.useState<string>(String(props.initialZoom));
  const [zoom, setZoom] = React.useState<number>(props.initialZoom);
  const [device, setDevice] = React.useState<IDevice | null>(null);

  const onHeightInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHeightInput(event.target.value);
  };

  const onWidthInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWidthInput(event.target.value);
  };

  const onZoomInputChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setZoomInput(event.target.value);
  };

  const onDeviceInputChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (device?.name === event.target.value) {
      return;
    }
    const matchedDevice = devices.filter((device: IDevice): boolean => device.name === event.target.value);
    if (matchedDevice.length > 0) {
      setDevice(matchedDevice[0]);
    } else {
      setDevice(null);
    }
  }

  React.useEffect((): void => {
    const candidate = Number(heightInput);
    if (candidate && candidate !== height) {
      setHeight(candidate);
      if (device && candidate !== device.height) {
        setDevice(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightInput]);

  React.useEffect((): void => {
    const candidate = Number(widthInput);
    if (candidate && candidate !== width) {
      setWidth(candidate);
      if (device && candidate !== device.width) {
        setDevice(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthInput]);

  React.useEffect((): void => {
    const candidate = Number(zoomInput);
    if (candidate && candidate !== zoom) {
      setZoom(candidate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomInput]);

  React.useEffect((): void => {
    if (device) {
      setHeightInput(String(device.height));
      setWidthInput(String(device.width));
    }
  }, [device]);

  React.useEffect((): void => {
    props.onSizeChanged(props.itemId, width, height, zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.itemId, width, height, zoom]);

  const onCloseClicked = (): void => {
    props.onCloseClicked(props.itemId);
  };

  return (
    <StyledGridItem minimumWidth={props.minimumWidth}>
      <GridItemTitle>
        <select value={zoomInput} onChange={onZoomInputChanged}>
          <option value="1">100%</option>
          <option value="1.5">66%</option>
          <option value="2">50%</option>
          <option value="2.5">40%</option>
          <option value="5">20%</option>
        </select>
        <SizeWrapper>
          <select value={device ? device.name : ''} onChange={onDeviceInputChanged}>
            <option value=''>Manual</option>
            {devices.map((device: IDevice): React.ReactElement => (
              <option value={device.name} key={device.name}>{device.name}</option>
            ))}
          </select>
          <div>
            <StyledInput value={widthInput} onChange={onWidthInputChanged} />
            x
            <StyledInput value={heightInput} onChange={onHeightInputChanged} />
          </div>
        </SizeWrapper>
        <StyledCloseButton onClick={onCloseClicked}>x</StyledCloseButton>
      </GridItemTitle>
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