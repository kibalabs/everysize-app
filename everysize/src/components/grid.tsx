import React from 'react';
import { Requester, RestMethod, KibaResponse } from '@kibalabs/core';
import { Box } from '@kibalabs/ui-react';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

import { GridItem } from './gridItem';
import { GridBackground } from './gridBackground';
import { IBox } from '../model';

const DRAG_HANDLE_CLASS = 'drag-handle';

interface IGridProps {
  rowHeight: number;
  columnWidth: number;
  paddingSize: number;
  totalWidth: number;
  columnCount: number;
  minimumGridItemWidth: number;
  url: string;
  boxes: IBox[];
  onBoxCloseClicked: (itemId: string) => void;
  onBoxSizeChanged: (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => void;
  onBoxPositionChanged: (itemId: string, positionX: number, positionY: number) => void;
}

export const Grid = (props: IGridProps): React.ReactElement => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isIframeBlocked, setIsIframeBlocked] = React.useState(false);

  const onBoxCloseClicked = (itemId: string): void => {
    props.onBoxCloseClicked(itemId);
  }

  const onBoxSizeChanged = (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => {
    props.onBoxSizeChanged(itemId, width, height, zoom, deviceCode);
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
    const estimate = Math.ceil(width / (props.columnWidth + props.paddingSize));
    return (estimate * props.columnWidth) + ((estimate - 1) * props.paddingSize) >= width ? estimate : estimate + 1;
  }

  const getRowCount = (height: number): number => {
    const estimate = Math.ceil(height / (props.rowHeight + props.paddingSize));
    return (estimate * props.rowHeight) + ((estimate - 1) * props.paddingSize) >= height ? estimate : estimate + 1;
  }

  const getLayout = (): Layout[] => {
    return props.boxes.map((box: IBox): Layout => {
      return {
        i: box.itemId,
        x: box.positionX,
        y: box.positionY,
        w: getColumnCount(Math.max(box.width / box.zoom, props.minimumGridItemWidth)),
        // TOTO(krishan711): remove hardcoded 75 (which is the height of the title of each grid item)
        h: getRowCount((box.height / box.zoom) + 75),
        isResizable: false,
      };
    });
  };

  const onDragStarted = (): void => {
    setIsDragging(true);
  };

  const onDragStopped = (): void => {
    setIsDragging(false);
  }

  React.useEffect((): void => {
    setIsIframeBlocked(false);
    new Requester().makeRequest(RestMethod.POST, 'https://api.kiba.dev/v1/retrieve-headers', {url: props.url}).then((response: KibaResponse) => {
      const frameHeaders = JSON.parse(response.content).headers.filter((header: {key: string, value: string}): boolean => header.key === 'x-frame-options');
      setIsIframeBlocked(frameHeaders.length > 0 && !frameHeaders[0].value.includes('https://everysize-app.kibalabs.com'));
    }).catch((error: Error): void => {
      console.log('error getting headers', error);
    });
  }, [props.url]);

  return (
    <Box isFullHeight={true} isFullWidth={true} maxWidth={`${props.totalWidth}px`}>
      {isDragging && (
        <GridBackground paddingSize={props.paddingSize} rowHeight={props.rowHeight} columnWidth={props.columnWidth} />
      )}
      <GridLayout
        cols={props.columnCount}
        width={props.totalWidth}
        rowHeight={props.rowHeight}
        margin={[props.paddingSize, props.paddingSize]}
        layout={getLayout()}
        onLayoutChange={onLayoutChanged}
        onDragStart={onDragStarted}
        onDragStop={onDragStopped}
        draggableHandle={`.${DRAG_HANDLE_CLASS}`}
      >
        { props.boxes.map((box: IBox): React.ReactElement => (
          // NOTE(krishan711): need div here are react-grid-layout adds styles directly
          <div key={box.itemId}>
            <GridItem
              itemId={box.itemId}
              url={props.url}
              isIframeBlocked={isIframeBlocked}
              columnWidth={props.columnWidth}
              rowHeight={props.rowHeight}
              paddingSize={props.paddingSize}
              initialHeight={box.height}
              initialWidth={box.width}
              initialZoom={box.zoom}
              initialDeviceCode={box.deviceCode}
              minimumWidth={props.minimumGridItemWidth}
              onCloseClicked={onBoxCloseClicked}
              onSizeChanged={onBoxSizeChanged}
              dragHandleClass={DRAG_HANDLE_CLASS}
            />
          </div>
        ))}
      </GridLayout>
    </Box>
  );
};
