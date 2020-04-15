import React from 'react';
import styled from 'styled-components';

import { IDevice, devices } from '../model/devices';
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
  initialZoom: number;
  onHeightChanged: (height: number) => void;
  onWidthChanged: (width: number) => void;
  onZoomChanged: (zoom: number) => void;
  onCloseClicked: () => void;
}

export const GridItemTitle = (props: IGridItemTitleProps): React.ReactElement => {
  const [heightInput, setHeightInput] = React.useState<string>(String(props.initialHeight));
  const [widthInput, setWidthInput] = React.useState<string>(String(props.initialWidth));
  const [zoomInput, setZoomInput] = React.useState<string>(String(props.initialZoom));
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

  const onCloseClicked = (): void => {
    props.onCloseClicked();
  };

  React.useEffect((): void => {
    const candidate = Number(heightInput);
    if (candidate) {
      props.onHeightChanged(candidate);
      if (device && candidate !== device.height) {
        setDevice(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightInput]);

  React.useEffect((): void => {
    const candidate = Number(widthInput);
    if (candidate) {
      props.onWidthChanged(candidate);
      if (device && candidate !== device.width) {
        setDevice(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthInput]);

  React.useEffect((): void => {
    const candidate = Number(zoomInput);
    if (candidate) {
      props.onZoomChanged(candidate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomInput]);

  React.useEffect((): void => {
    if (device) {
      setHeightInput(String(device.height));
      setWidthInput(String(device.width));
    }
  }, [device]);

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
