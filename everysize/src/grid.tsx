import React from 'react';
import styled from 'styled-components';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { WebView } from './webView';
import { GridItem } from './gridItem';
import { IBox } from './model';

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

interface IGridBackgroundProps {
  paddingSize: number;
  columnWidth: number;
  rowHeight: number;
}

const GridBackground = styled.div<IGridBackgroundProps>`
  height: ${(props: IGridBackgroundProps): string => `calc(100% - 2 * ${props.paddingSize}px)`};
  width: ${(props: IGridBackgroundProps): string => `calc(100% - 2 * ${props.paddingSize}px)`};
  position: absolute;
  transition: 0.3s;
  padding: ${(props: IGridBackgroundProps): string => `${props.paddingSize}px`};
`;

const GridBackgroundInner = styled.div<IGridBackgroundProps>`
  height: 100%;
  width: 100%;
  background-image: radial-gradient(circle, #bbb 1px, transparent 0.5px);
  background-size: ${(props: IGridBackgroundProps): string => `${props.paddingSize}px ${props.paddingSize}px`};
  background-position: 4px 4px;
  box-sizing: border-box;
  border: #bbb 1px solid;
  overflow: hidden;
`;

const GridBackgroundInnerInner = styled.div<IGridBackgroundProps>`
  height: 100%;
  width: 100%;
  background-image: radial-gradient(circle, #fff 10px, transparent 0px);
  background-size: 30px 30px;
  background-position: -1px -1px;
`;

interface IGridProps {
  url: string;
  boxes: IBox[];
  onBoxCloseClicked: (itemId: string) => void;
  onBoxSizeChanged: (itemId: string, width: number, height: number) => void;
  onBoxPositionChanged: (itemId: string, positionX: number, positionY: number) => void;
}

export const Grid = (props: IGridProps): React.ReactElement => {
  const [isDragging, setIsDragging] = React.useState(false);

  const onBoxCloseClicked = (itemId: string): void => {
    props.onBoxCloseClicked(itemId);
  }

  const onBoxSizeChanged = (itemId: string, width: number, height: number) => {
    props.onBoxSizeChanged(itemId, width, height);
  };

  const onLayoutChanged = (layouts: Layout[]): void => {
    layouts.forEach((layout: Layout): void => {
      const currentBox = props.boxes.filter((box: IBox): boolean => box.itemId === layout.i)[0];
      if (currentBox.positionX !== layout.x || currentBox.positionY !== layout.y) {
        props.onBoxPositionChanged(currentBox.itemId, layout.x, layout.y);
      }
    });
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
    return props.boxes.map((box: IBox): Layout => {
      return {
        i: box.itemId,
        x: box.positionX,
        y: box.positionY,
        w: getColumnCount(box.width),
        h: getRowCount(box.height),
        isResizable: false,
      };
    });
  };

  const onDragStarted = (): void => {
    setIsDragging(true);
  };

  const onDragStopped = (): void => {
    setIsDragging(false);
  };

  return (
    <div style={{position: 'relative', maxWidth: `${totalWidth}px`}}>
      {isDragging && (
        <GridBackground paddingSize={paddingSize} rowHeight={rowHeight} columnWidth={columnWidth}>
          <GridBackgroundInner paddingSize={paddingSize} rowHeight={rowHeight} columnWidth={columnWidth}>
            <GridBackgroundInnerInner paddingSize={paddingSize} rowHeight={rowHeight} columnWidth={columnWidth}></GridBackgroundInnerInner>
          </GridBackgroundInner>
        </GridBackground>
      )}
      <GridLayout
        className="layout"
        cols={columnCount}
        width={totalWidth}
        rowHeight={rowHeight}
        margin={[paddingSize, paddingSize]}
        layout={getLayout()}
        onLayoutChange={onLayoutChanged}
        onDragStart={onDragStarted}
        onDragStop={onDragStopped}
      >
        { props.boxes.map((box: IBox): React.ReactElement => (
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
                url={props.url}
                errorView={<div>Error</div>}
              />
            </GridItem>
          </GridItemWrapper>
        ))}
      </GridLayout>
    </div>
  );
};
