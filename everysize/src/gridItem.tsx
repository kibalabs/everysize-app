import React from 'react';
import styled from 'styled-components';
import { IDevice, devices } from './devices';

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
  width: number;
  height: number;
}

const StyledGridItem = styled.div<IStyledGridItemProps> `
  width: ${(props: IStyledGridItemProps): string => `${props.width}px`};
  height: ${(props: IStyledGridItemProps): string => `calc(${props.height}px + 50px)`};
  background-color: #333333;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
`;

interface IGridItemProps {
  itemId: string;
  initialHeight: number;
  initialWidth: number;
  initialZoom: number;
  onCloseClicked: (itemId: string) => void;
  children: React.ReactChild | React.ReactChild[];
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
  }, [heightInput, height, zoomInput, device]);

  React.useEffect((): void => {
    const candidate = Number(widthInput);
    if (candidate && candidate !== width) {
      setWidth(candidate);
      if (device && candidate !== device.width) {
        setDevice(null);
      }
    }
  }, [widthInput, width, zoomInput, device]);

  React.useEffect((): void => {
    const candidate = Number(zoomInput);
    if (candidate && candidate !== zoom) {
      setZoom(candidate);
      setDevice(null);
    }
  }, [zoomInput, zoom]);

  React.useEffect((): void => {
    if (device) {
      setHeightInput(String(device.height));
      setWidthInput(String(device.width));
    }
  }, [device]);

  const onCloseClicked = (): void => {
    props.onCloseClicked(props.itemId);
  };

  return (
    <StyledGridItem
      width={width / zoom}
      height={height / zoom}
    >
      <GridItemTitle>
        <select value={zoomInput} onChange={onZoomInputChanged}>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
          <option value="2.5">2.5x</option>
          <option value="5">5x</option>
        </select>
        <div>
          <select value={device ? device.name : ''} onChange={onDeviceInputChanged}>
            <option value=''>Manual</option>
            {devices.map((device: IDevice): React.ReactElement => (
              <option value={device.name} key={device.name}>{device.name} ({device.width}x{device.height})</option>
            ))}
          </select>
          <StyledInput value={widthInput} onChange={onWidthInputChanged} />
          x
          <StyledInput value={heightInput} onChange={onHeightInputChanged} />
        </div>
        <button onClick={onCloseClicked}>x</button>
      </GridItemTitle>
      <GridItemChildrenHolder
        width={width}
        height={height}
        zoom={1.0 / zoom}
      >
        { props.children }
      </GridItemChildrenHolder>
    </StyledGridItem>
  );
}

GridItem.defaultProps = {
  initialHeight: 100,
  initialWidth: 100,
  initialZoom: 1,
};
