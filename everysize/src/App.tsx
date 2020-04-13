import React from 'react';

import { NavBar } from './navBar';
import { Grid } from './grid';
import { IBox, deserializeBox, serializeBox } from './model';
import { useSize } from './useSize';
import { useUrlQueryState } from './useUrlQueryState';
import { useLocalStorageState, useStringListLocalStorageState } from './useLocalStorageState';
import { useValueSync } from './useValueSync';
import { generateUUID } from './stringUtil';


const boxListFromStringList = (stringList: string[] | null): IBox[] => {
  if (!stringList) {
    return [];
  }
  return stringList?.map((boxString: string): IBox | null => deserializeBox(boxString)).filter((box: IBox | null): boolean => box !== null) as IBox[];
}

const  boxListToStringList = (boxes: IBox[] | null): string[] | null => {
  if (boxes === null) {
    return boxes;
  }
  return boxes.map((box: IBox): string => serializeBox(box));
}

export const useBoxListLocalStorageState = (name: string, delimiter: string = ',', overrideInitialValue?: IBox[] | null): [IBox[], (newValue: IBox[] | null) => void] => {
  const [value, setValue] = useStringListLocalStorageState(name, delimiter, overrideInitialValue !== undefined ? boxListToStringList(overrideInitialValue) : undefined);
  return [boxListFromStringList(value), ((newValue: IBox[] | null): void => setValue(boxListToStringList(newValue)))];
};

const App = (): React.ReactElement => {
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const size = useSize(gridRef.current);
  const [boxes, setBoxes] = useBoxListLocalStorageState('boxes');
  const [url, setUrl] = useUrlQueryState('url');
  const [storedUrl, setStoredUrl] = useLocalStorageState('url', url);
  useValueSync(storedUrl, setUrl);

  const [totalWidth, setTotalWidth] = React.useState(10000);
  const rowHeight = 20;
  const columnWidth = 20;
  const paddingSize = 10;
  const minimumGridItemWidth = 250;
  const columnCount = (totalWidth - paddingSize) / (columnWidth + paddingSize);

  React.useEffect((): void => {
    if (!url && !storedUrl) {
      setUrl('https://kibalabs.com')
    }
    if (boxes.length === 0) {
      setBoxes([{
        itemId: 'default-1',
        height: 1080,
        width: 1920,
        zoom: 5,
        positionX: 0,
        positionY: 0,
      }, {
        itemId: 'default-2',
        height: 896,
        width: 414,
        zoom: 2.5,
        positionX: 13,
        positionY: 0,
      }, {
        itemId: 'default-3',
        height: 812,
        width: 375,
        zoom: 2.5,
        positionX: 22,
        positionY: 0,
      }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUrlChanged = (url: string): void => {
    setStoredUrl(url);
  };

  const onAddClicked = (): void => {
    setBoxes([...boxes, {itemId: generateUUID(), height: 600, width: 900, zoom: 2, positionX: 0, positionY: 0}]);
  };

  const onRemoveBoxClicked = (itemId: string): void => {
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  };

  const onBoxSizeChanged = (itemId: string, width: number, height: number, zoom: number) => {
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, width: width, height: height, zoom: zoom} : box
    )));
  };

  const onBoxPositionChanged = (itemId: string, positionX: number, positionY: number): void => {
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, positionX: positionX, positionY: positionY} : box
    )));
  };

  React.useEffect((): void => {
    if (size) {
      setTotalWidth(Math.floor((size.width - paddingSize) / (columnWidth + paddingSize)) * (columnWidth + paddingSize));
    }
  }, [size]);

  return (
    <div ref={gridRef}>
      <NavBar url={url || null} onUrlChanged={onUrlChanged}/>
      <button onClick={onAddClicked}>add</button>
      <hr /><hr />
      <Grid
        rowHeight={rowHeight}
        columnWidth={columnWidth}
        paddingSize={paddingSize}
        totalWidth={totalWidth}
        minimumGridItemWidth={minimumGridItemWidth}
        columnCount={columnCount}
        url={url || null}
        boxes={boxes}
        onBoxCloseClicked={onRemoveBoxClicked}
        onBoxSizeChanged={onBoxSizeChanged}
        onBoxPositionChanged={onBoxPositionChanged}
      />
    </div>
  );
}

export default App;
