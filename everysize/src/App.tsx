import React from 'react';

import { NavBar } from './navBar';
import { Grid } from './grid';
import { IBox } from './model';


const App = (): React.ReactElement => {
  const [url, setUrl] = React.useState<string>('https://example.com');
  const [nextBoxId, setNextBoxId] = React.useState<number>(1);
  const [boxes, setBoxes] = React.useState<IBox[]>([]);

  const onAddClicked = (): void => {
    setBoxes([...boxes, {itemId: String(nextBoxId), initialWidth: 400, initialHeight: 300, height: 1, width: 1, zoom: 1, positionX: 0, positionY: 0}]);
    setNextBoxId(nextBoxId + 1);
  };

  const onRemoveBoxClicked = (itemId: string): void => {
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  };

  const onBoxSizeChanged = (itemId: string, width: number, height: number) => {
    console.log('updating box size', itemId, width, height);
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, width: width, height: height} : box
    )));
  };

  const onBoxPositionChanged = (itemId: string, positionX: number, positionY: number): void => {
    console.log('updating box position', itemId, positionX, positionY);
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, positionX: positionX, positionY: positionY} : box
    )));
  };

  return (
    <div>
      <NavBar url={url} onUrlChanged={setUrl}/>
      <button onClick={onAddClicked}>add</button>
      <hr /><hr />
      <Grid
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
