import { generateUUID } from '../util';
import { IBox } from './box';

export const defaultLayout: IBox[] = [{
  itemId: 'default-1',
  deviceCode: 'bs-md',
  height: 0,
  width: 0,
  zoom: 2,
  positionX: 0,
  positionY: 0,
}];

export const createDefaultDevice = (): IBox => {
  return {
    itemId: generateUUID(),
    deviceCode: 'bs-md',
    height: 0,
    width: 0,
    zoom: 2,
    positionX: 0,
    positionY: 0,
  }
}
