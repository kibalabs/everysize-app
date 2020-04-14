
export interface IBox {
  itemId: string;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zoom: number;
}

export const serializeBox = (box: IBox): string => {
  if (box.itemId.includes('$')) {
    throw Error(`Box itemIds cannot contain '$'. Offending box: ${box}`);
  }
  return [box.itemId, box.width, box.height, box.positionX, box.positionY, box.zoom].join('$');
}

export const deserializeBox = (boxString: string): IBox | null => {
  const stringParts = boxString.split('$');
  try {
    return {
      itemId: stringParts[0],
      width: Number(stringParts[1]),
      height: Number(stringParts[2]),
      positionX: Number(stringParts[3]),
      positionY: Number(stringParts[4]),
      zoom: Number(stringParts[5]),
    }
  } catch (error) {
    return null;
  }
}
