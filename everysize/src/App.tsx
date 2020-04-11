import React from 'react';
import ReactGridLayout, { Layout } from 'react-grid-layout';

import { WebView } from './webView';
import { GridItem } from './gridItem';
import { useDeepCompareEffect } from './useDeepCompareEffect';
import { getFirstWithKeyValue } from './util';

interface IBox {
  itemId: string;
  height: number;
  width: number;
  zoom: number;
}

const rowHeight = 10;
const columnWidth = 10;
const totalWidth = 1000;

function App() {
  const [nextItemId, setNextItemId] = React.useState<number>(1);
  const [url, setUrl] = React.useState<string>('https://kiwidocs.co');
  const [boxes, setBoxes] = React.useState<IBox[]>([{itemId: String(nextItemId), height: 500, width: 750, zoom: 1}]);
  const [layouts, setLayouts] = React.useState<Layout[]>([]);

  React.useEffect((): void => {
    setNextItemId(nextItemId + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect((): void => {
    console.log('updating layouts');
    setLayouts(boxes.map((box: IBox): Layout => {
      const boxLayout = getFirstWithKeyValue(layouts, 'i', box.itemId) || { i: box.itemId, x: 0, y: 0, w: 0, h: 0 };
      boxLayout.w = box.width / columnWidth;
      boxLayout.h = box.height / rowHeight;
      return boxLayout
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxes]);

  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  const onAddClicked = (): void => {
    setBoxes([...boxes, {itemId: String(nextItemId), height: 500, width: 750, zoom: 1}]);
    setNextItemId(nextItemId + 1);
  };

  const onBoxCloseClicked = (itemId: string): void => {
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  }

  const onBoxSizeChanged = (itemId: string, width: number, height: number) => {
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, width: width, height: height} : box
    )));
  };

  const onLayoutChanged = (layouts: Layout[]): void => {
    console.log('new layouts:', layouts);
    setLayouts(layouts);
  };

  return (
    <React.StrictMode>
      <input
        value={url}
        onChange={onUrlChanged}
      />
      <hr />
      <button onClick={onAddClicked}>add</button>
      <hr />
      <ReactGridLayout
        cols={totalWidth / columnWidth}
        width={totalWidth}
        rowHeight={rowHeight}
        layout={layouts}
        onLayoutChange={onLayoutChanged}
      >
        <div key='dummy1' data-grid={{x:0, y:0, h: 2, w: 2}}>hello world</div>
        { boxes.map((box: IBox): React.ReactElement => (
          <div key={box.itemId}>
            <GridItem
              itemId={box.itemId}
              initialHeight={box.height}
              initialWidth={box.width}
              initialZoom={box.zoom}
              onCloseClicked={onBoxCloseClicked}
              onSizeChanged={onBoxSizeChanged}
            >
              <WebView
                url={url}
                errorView={<div>Error</div>}
              />
            </GridItem>
          </div>
        ))}
      </ReactGridLayout>
    </React.StrictMode>
  );
}

export default App;
