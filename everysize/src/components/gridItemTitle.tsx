import React from 'react';
import styled from 'styled-components';

import { IDevice, devices, getDeviceByCode } from '../model/devices';
import { CloseIcon } from './closeIcon';

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

const StyledGridItemTitle = styled.div`
  width: 100%;
  min-height: 50px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledCloseButton = styled.button`
  background-color: #393939;
  color: #dddddd;
  padding: 5px;
  border-radius: 4px;
  width: 25px;
  height: 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  transition: 0.3s;

  :hover {
    background-color: #292929;
    color: white;
  }

  :active {
    background-color: #191919;
  }
`;

const LeftHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: left;
  align-items: start;
`;

const RightHolder = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 15px;
`;

const LeftInnerHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SizeHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface IGridItemTitleProps {
  initialHeight: number;
  initialWidth: number;
  initialDeviceCode: string | null;
  initialZoom: number;
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
    }
  };

  const onWidthInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(event.target.value)) {
      setWidthInput(event.target.value);
    }
  };

  const onZoomInputChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setZoomInput(event.target.value);
  };

  const onCloseClicked = (): void => {
    props.onCloseClicked();
  };

  // React.useEffect((): void => {
  //   props.onHeightChanged(candidate);
  //   // if (device && candidate !== device.height) {
  //   //   setDevice(null);
  //   // }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [heightInput]);

  // React.useEffect((): void => {
  //   props.onWidthChanged(candidate);
  //   // if (device && candidate !== device.width) {
  //   //   setDevice(null);
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [widthInput]);

  // React.useEffect((): void => {
  //   props.onZoomChanged(candidate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [zoomInput]);

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
    <StyledGridItemTitle>
      <LeftHolder>
        <StyledSelect value={device ? device.name : ''} onChange={onDeviceInputChanged}>
          <option value=''>Manual</option>
          {devices.map((device: IDevice): React.ReactElement => (
            <option value={device.name} key={device.name}>{device.name}</option>
          ))}
        </StyledSelect>
        <LeftInnerHolder>
          <SizeHolder>
            <StyledInput value={widthInput} onChange={onWidthInputChanged} />
            <div style={{width: '10px'}}><CloseIcon /></div>
            <StyledInput value={heightInput} onChange={onHeightInputChanged} />
          </SizeHolder>
          <StyledSelectSmall value={zoomInput} onChange={onZoomInputChanged}>
            <option value="1">100%</option>
            <option value="1.5">66%</option>
            <option value="2">50%</option>
            <option value="2.5">40%</option>
            <option value="5">20%</option>
          </StyledSelectSmall>
        </LeftInnerHolder>
      </LeftHolder>
      <RightHolder>
        <StyledCloseButton onClick={onCloseClicked}><CloseIcon /></StyledCloseButton>
      </RightHolder>
    </StyledGridItemTitle>
  );
};
