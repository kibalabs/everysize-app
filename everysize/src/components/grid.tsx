import React from 'react';
import styled from 'styled-components';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { GridItem } from './gridItem';
import { GridBackground } from './gridBackground';
import { IBox } from '../model';

const DRAG_HANDLE_CLASS = 'drag-handle';

const StyledGrid = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

interface IStyledGridInnerProps {
  totalWidth: number;
}

const StyledGridInner = styled.div<IStyledGridInnerProps>`
  position: relative;
  max-width: ${(props: IStyledGridInnerProps): string => `${props.totalWidth}px`};;
`;

const GridItemWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  background-color: #333333;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

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
        // TOTO(krish): remove hardcoded 50 (which is the height of the top bit of each grid item)
        h: getRowCount((box.height / box.zoom) + 50),
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
    axios.post('https://api.kiba.dev/v1/retrieve-headers', {url: props.url}).then((response: AxiosResponse) => {
      const frameHeaders = response.data.headers.filter((header: {key: string, value: string}): boolean => header.key === 'x-frame-options');
      setIsIframeBlocked(frameHeaders.length > 0 && !frameHeaders[0].value.includes('https://everysize-app.kibalabs.com'));
    }).catch((error: AxiosError): void => {
      console.log('error getting headers', error);
    });
  }, [props.url]);

  return (
    <StyledGrid>
      <StyledGridInner totalWidth={props.totalWidth}>
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
            <GridItemWrapper key={box.itemId}>
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
            </GridItemWrapper>
          ))}
        </GridLayout>
      </StyledGridInner>
    </StyledGrid>
  );
};
