import React from 'react';

import { NavBar } from './navBar';
import { Grid } from './grid';
import { IBox } from './model';
import { useSize } from './useSize';
import { useUrlQueryState } from './useUrlQueryState';
import { useLocalStorageState } from './useLocalStorageState';
import { useValueSync } from './useValueSync';


const App = (): React.ReactElement => {
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const size = useSize(gridRef.current);
  const [url, setUrl] = useUrlQueryState('url');
  const [storedUrl, setStoredUrl] = useLocalStorageState('url', url);
  useValueSync(storedUrl, setUrl);
  const [nextBoxId, setNextBoxId] = React.useState<number>(1);
  const [boxes, setBoxes] = React.useState<IBox[]>([]);

  const [totalWidth, setTotalWidth] = React.useState(1000);
  const rowHeight = 20;
  const columnWidth = 20;
  const paddingSize = 10;
  const columnCount = (totalWidth - paddingSize) / (columnWidth + paddingSize);

  const onUrlChanged = (url: string): void => {
    setStoredUrl(url);
  };

  const onAddClicked = (): void => {
    setBoxes([...boxes, {itemId: String(nextBoxId), initialWidth: 600, initialHeight: 900, height: 1, width: 1, zoom: 2, positionX: 0, positionY: 0}]);
    setNextBoxId(nextBoxId + 1);
  };

  const onRemoveBoxClicked = (itemId: string): void => {
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  };

  const onBoxSizeChanged = (itemId: string, width: number, height: number) => {
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, width: width, height: height} : box
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
