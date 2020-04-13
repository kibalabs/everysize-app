
export interface IBox {
  itemId: string;
  height: number;
  width: number;
  positionX: number;
  positionY: number;
  zoom: number;
}

export const serializeBox = (box: IBox): string => {
  if (box.itemId.includes('$')) {
    throw Error(`Box itemIds cannot contain '$'. Offending box: ${box}`);
  }
  return [box.itemId, box.height, box.width, box.positionX, box.positionY, box.zoom].join('$');
}

export const deserializeBox = (boxString: string): IBox | null => {
  const stringParts = boxString.split('$');
  try {
    return {
      itemId: stringParts[0],
      height: Number(stringParts[1]),
      width: Number(stringParts[2]),
      positionX: Number(stringParts[3]),
      positionY: Number(stringParts[4]),
      zoom: Number(stringParts[5]),
    }
  } catch (error) {
    return null;
  }
}
