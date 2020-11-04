import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { Alignment, Stack, Direction, PaddingSize, IconButton, KibaIcon, Box } from '@kibalabs/ui-react';

import { IDevice, devices, getDeviceByCode } from '../model/devices';

// TODO(krishan711): replace the selects with one from ui-react once it's there.
const StyledSelect = styled.select`
  background: none;
  appearance: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.25);
  color: white;
  padding: 2px 5px;
  font-size: 14px;
`;

const StyledSelectSmall = styled.select`
  background: none;
  appearance: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  text-align: center;
  font-size: 12px;
`;

const StyledInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  text-align: center;
  font-size: 12px;
  max-width: 5ch;
`;

interface IGridItemTitleProps {
  initialHeight: number;
  initialWidth: number;
  initialDeviceCode: string | null;
  initialZoom: number;
  dragHandleClass?: string;
  onSizeChanged: (height: number, width: number, zoom: number, deviceCode: string | null) => void;
  onCloseClicked: () => void;
}

export const GridItemTitle = (props: IGridItemTitleProps): React.ReactElement => {
  const initialDevice = getDeviceByCode(props.initialDeviceCode);
  const [device, setDevice] = React.useState<IDevice | null>(initialDevice);
  const [heightInput, setHeightInput] = React.useState<string>(String(initialDevice ? initialDevice.height : props.initialHeight));
  const [widthInput, setWidthInput] = React.useState<string>(String(initialDevice ? initialDevice.width : props.initialWidth));
  const [zoomInput, setZoomInput] = React.useState<string>(String(props.initialZoom));

  const onHeightInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(event.target.value)) {
      setHeightInput(event.target.value);
      if (device && Number(event.target.value) !== device.height) {
        setDevice(null);
      }
    }
  };

  const onWidthInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(event.target.value)) {
      setWidthInput(event.target.value);
      if (device && Number(event.target.value) !== device.width) {
        setDevice(null);
      }
    }
  };

  const onZoomInputChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setZoomInput(event.target.value);
  };

  const onCloseClicked = (): void => {
    props.onCloseClicked();
  };

  React.useEffect((): void => {
    props.onSizeChanged(Number(heightInput), Number(widthInput), Number(zoomInput), device?.code || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightInput, widthInput, zoomInput, device]);

  const onDeviceInputChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (device?.name === event.target.value) {
      return;
    }
    const matchedDevice = devices.filter((device: IDevice): boolean => device.name === event.target.value);
    if (matchedDevice.length > 0) {
      setDevice(matchedDevice[0]);
      setHeightInput(String(matchedDevice[0].height));
      setWidthInput(String(matchedDevice[0].width));
    } else {
      setDevice(null);
    }
  }

  return (
    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} isFullWidth={true} paddingHorizontal={PaddingSize.Default}>
      <Box width={'30px'} className={getClassName(props.dragHandleClass)}>
        <KibaIcon _color='rgba(255, 255, 255, 0.7)' iconId='mui-drag-indicator'/>
      </Box>
      <Stack direction={Direction.Vertical}>
        <StyledSelect value={device ? device.name : ''} onChange={onDeviceInputChanged}>
          <option value=''>Manual</option>
          {devices.map((device: IDevice): React.ReactElement => (
            <option value={device.name} key={device.name}>{device.name}</option>
          ))}
        </StyledSelect>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Fill}>
          <StyledSelectSmall value={zoomInput} onChange={onZoomInputChanged}>
            <option value="1">100%</option>
            <option value="1.5">66%</option>
            <option value="2">50%</option>
            <option value="2.5">40%</option>
            <option value="5">20%</option>
          </StyledSelectSmall>
          <Stack.Item growthFactor={1} />
          <StyledInput value={widthInput} onChange={onWidthInputChanged} />
          <KibaIcon _color='rgba(255, 255, 255, 0.7)' variant='small' iconId='ion-close'/>
          <StyledInput value={heightInput} onChange={onHeightInputChanged} />
          <Stack.Item growthFactor={1} />
        </Stack>
      </Stack>
      <Stack.Item growthFactor={1} />
      <IconButton icon={<KibaIcon variant='small' iconId='ion-close'/>} onClicked={onCloseClicked} />
    </Stack>
  );
};
