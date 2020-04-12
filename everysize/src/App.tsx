import React from 'react';
import styled from 'styled-components';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { WebView } from './webView';
import { GridItem } from './gridItem';
// import { useDeepCompareEffect } from './useDeepCompareEffect';
// import { getFirstWithKeyValue } from './util';

interface IBox {
  itemId: string;
  height: number;
  width: number;
  initialHeight: number;
  initialWidth: number;
  positionX: number;
  positionY: number;
  zoom: number;
}

const rowHeight = 50;
const columnWidth = 50;
const totalWidth = 1000;

const GridItemWrapper = styled.div`

`;

function App() {
  const [nextItemId, setNextItemId] = React.useState<number>(1);
  const [url, setUrl] = React.useState<string>('https://kiwidocs.co');
  const [boxes, setBoxes] = React.useState<IBox[]>([{itemId: String(nextItemId), initialHeight: 500, initialWidth: 750, height: 1, width: 1, zoom: 2, positionX: 0, positionY: 0}]);
  // const [layouts, setLayouts] = React.useState<Layout[]>([]);

  React.useEffect((): void => {
    setNextItemId(nextItemId + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  const onAddClicked = (): void => {
    setBoxes([...boxes, {itemId: String(nextItemId), initialHeight: 500, initialWidth: 750, height: 1, width: 1, zoom: 2, positionX: 10, positionY: 10}]);
    setNextItemId(nextItemId + 1);
  };

  const onBoxCloseClicked = (itemId: string): void => {
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  }

  const onBoxSizeChanged = (itemId: string, width: number, height: number) => {
    console.log('updating box', itemId);
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, width: width, height: height} : box
    )));
  };

  const onLayoutChanged = (layouts: Layout[]): void => {
    console.log('new layouts:', layouts);
    setBoxes(layouts.map((layout: Layout): IBox => {
      const currentBox = boxes.filter((box: IBox): boolean => box.itemId === layout.i)[0];
      return {
        ...currentBox,
        positionX: layout.x,
        positionY: layout.y
      };
    }));
  };

  const getLayout = (): Layout[] => {
    return boxes.map((box: IBox): Layout => {
      return {
        i: box.itemId,
        x: box.positionX,
        y: box.positionY,
        w: Math.ceil(box.width / columnWidth),
        h: Math.ceil(box.height / rowHeight),
        isResizable: false,
      };
    });
  }

  console.log('columns', totalWidth / columnWidth)
  console.log('width', totalWidth)
  console.log('rowHeight', rowHeight)
  console.log('boxes', boxes);
  console.log('layouts', getLayout());

  return (
    <div>
      <input
        value={url}
        onChange={onUrlChanged}
      />
      <hr />
      <button onClick={onAddClicked}>add</button>
      <hr />
      <GridLayout
        className="layout"
        cols={totalWidth / columnWidth}
        width={totalWidth}
        rowHeight={rowHeight}
        margin={[0, 0]}
        layout={getLayout()}
        onLayoutChange={onLayoutChanged}
      >
        { boxes.map((box: IBox): React.ReactElement => (
          <GridItemWrapper key={box.itemId}>
            <GridItem
              itemId={box.itemId}
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              initialHeight={box.initialHeight}
              initialWidth={box.initialWidth}
              initialZoom={box.zoom}
              onCloseClicked={onBoxCloseClicked}
              onSizeChanged={onBoxSizeChanged}
            >
              <WebView
                url={url}
                errorView={<div>Error</div>}
              />
            </GridItem>
          </GridItemWrapper>
        ))}
      </GridLayout>

      {/* <div style={{width: '1000px', backgroundColor: '#555555'}}>
        <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1000}>
          <div key="a" style={{backgroundColor: 'red'}}>a</div>
          <div key="b" style={{backgroundColor: 'blue'}}>b</div>
          <div key="c" style={{backgroundColor: 'green'}}>c</div>
        </GridLayout>
      </div> */}
    </div>
  );
}


export default App;
