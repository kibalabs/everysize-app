import React from 'react';

import { NavBar } from './navBar';
import { Grid } from './grid';
import { IBox } from './model';
import { useSize } from './useSize';


const App = (): React.ReactElement => {
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const size = useSize(gridRef.current);
  const [url, setUrl] = React.useState<string>('https://example.com');
  const [nextBoxId, setNextBoxId] = React.useState<number>(1);
  const [boxes, setBoxes] = React.useState<IBox[]>([]);

  const [totalWidth, setTotalWidth] = React.useState(1000);
  const rowHeight = 20;
  const columnWidth = 20;
  const paddingSize = 10;
  const columnCount = (totalWidth - paddingSize) / (columnWidth + paddingSize);

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
      <NavBar url={url} onUrlChanged={setUrl}/>
      <button onClick={onAddClicked}>add</button>
      <hr /><hr />
      <Grid
        rowHeight={rowHeight}
        columnWidth={columnWidth}
        paddingSize={paddingSize}
        totalWidth={totalWidth}
        columnCount={columnCount}
        url={url}
        boxes={boxes}
        onBoxCloseClicked={onRemoveBoxClicked}
        onBoxSizeChanged={onBoxSizeChanged}
        onBoxPositionChanged={onBoxPositionChanged}
      />
    </div>
  );
}

export default App;
