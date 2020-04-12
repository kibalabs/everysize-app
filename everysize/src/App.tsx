import React from 'react';
import styled from 'styled-components';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { ReactComponent as Logo } from './everysize-wordmark.svg';

import { WebView } from './webView';
import { GridItem } from './gridItem';

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

const rowHeight = 20;
const columnWidth = 20;
const paddingSize = 10;
const totalWidth = 1000;
const columnCount = (totalWidth - paddingSize) / (columnWidth + paddingSize);

const GridItemWrapper = styled.div`
  overflow: hidden;
  border-radius: 4px;
  background-color: #333333;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

function App() {
  const [nextItemId, setNextItemId] = React.useState<number>(1);
  const [url, setUrl] = React.useState<string>('https://example.com');
  const [boxes, setBoxes] = React.useState<IBox[]>([{itemId: String(nextItemId), initialWidth: 800, initialHeight: 500, height: 1, width: 1, zoom: 1, positionX: 0, positionY: 0}]);

  React.useEffect((): void => {
    setNextItemId(nextItemId + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  const onAddClicked = (): void => {
    setBoxes([...boxes, {itemId: String(nextItemId), initialWidth: 400, initialHeight: 300, height: 1, width: 1, zoom: 1, positionX: 0, positionY: 0}]);
    setNextItemId(nextItemId + 1);
  };

  const onBoxCloseClicked = (itemId: string): void => {
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  }

  const onBoxSizeChanged = (itemId: string, width: number, height: number) => {
    console.log('updating box', itemId, width, height);
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

  const getColumnCount = (width: number): number => {
    // TODO(krish): the 0.00001 is because if the division lands on a whole number
    // it will be wrong because there is an extra padding taken into account which wont be there
    return Math.ceil(width / (rowHeight + paddingSize) + 0.000001);
  }

  const getRowCount = (height: number): number => {
    return Math.ceil(height / (columnWidth + paddingSize) + 0.00001);
  }

  const getLayout = (): Layout[] => {
    return boxes.map((box: IBox): Layout => {
      return {
        i: box.itemId,
        x: box.positionX,
        y: box.positionY,
        w: getColumnCount(box.width),
        h: getRowCount(box.height),
        isResizable: false,
      };
    });
  }

  console.log('columnCount', columnCount)
  console.log('width', totalWidth)
  console.log('rowHeight', rowHeight)
  console.log('boxes', boxes);
  console.log('layouts', getLayout());

  return (
    <div>
      <Logo height='50px' width='300px'/>
      <br />
      <input
        value={url}
        onChange={onUrlChanged}
      />
      <hr />
      <button onClick={onAddClicked}>add</button>
      <hr />
      <div>
        <GridLayout
          className="layout"
          cols={columnCount}
          width={totalWidth}
          rowHeight={rowHeight}
          margin={[paddingSize, paddingSize]}
          layout={getLayout()}
          onLayoutChange={onLayoutChanged}
        >
          { boxes.map((box: IBox): React.ReactElement => (
            <GridItemWrapper key={box.itemId}>
              <GridItem
                itemId={box.itemId}
                columnWidth={columnWidth}
                rowHeight={rowHeight}
                paddingSize={paddingSize}
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
      </div>
    </div>
  );
}

export default App;
