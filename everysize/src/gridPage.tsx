import React from 'react';
import styled from 'styled-components';

import { NavBar } from './components/navBar';
import { Grid } from './components/grid';
import { IBox, deserializeBox, serializeBox, defaultLayout, createDefaultDevice } from './model';
import { useSizingRef, useUrlQueryState, useLocalStorageState, useStringListLocalStorageState, useValueSync } from './util';
import { FloatingActionButton } from './components/floatingActionButton';
import { Footer } from './components/footer';
import { usePageView, trackEvent } from './util/useAnalytics';


const GridPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const NavbarWrapper = styled.div`
  width: 100%;
  flex-grow: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const GridWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
`;

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

export const GridPage = (): React.ReactElement => {
  usePageView('grid');
  const [size, gridRef] = useSizingRef<HTMLDivElement>();
  const [boxes, setBoxes] = useBoxListLocalStorageState('boxes_v2');
  const [url, setUrl] = useUrlQueryState('url');
  const [storedUrl, setStoredUrl] = useLocalStorageState('url_v1', url);
  useValueSync(storedUrl, setUrl);

  const [totalWidth, setTotalWidth] = React.useState(10000);
  const rowHeight = 20;
  const columnWidth = 20;
  const paddingSize = 10;
  const minimumGridItemWidth = 250;
  const columnCount = (totalWidth - paddingSize) / (columnWidth + paddingSize);

  React.useEffect((): void => {
    if (!url && !storedUrl) {
      setUrl('https://www.kibalabs.com');
    }
    if (boxes.length === 0) {
      setBoxes(defaultLayout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUrlChanged = (url: string): void => {
    trackEvent('interaction', 'add_url', url);
    setStoredUrl(url);
  };

  const onAddClicked = (): void => {
    trackEvent('interaction', 'add_box');
    setBoxes([...boxes, createDefaultDevice()]);
  };

  const onRemoveBoxClicked = (itemId: string): void => {
    trackEvent('interaction', 'remove_box');
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  };

  const onBoxSizeChanged = (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => {
    if (deviceCode) {
      trackEvent('interaction', 'change_box_device', deviceCode || 'manual', zoom);
    } else {
      trackEvent('interaction', 'change_box_manual', `${width}x${height}`, zoom);
    }
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, width: width, height: height, zoom: zoom, deviceCode: deviceCode} : box
    )));
  };

  const onBoxPositionChanged = (itemId: string, positionX: number, positionY: number): void => {
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, positionX: positionX, positionY: positionY} : box
    )));
  };

  const onTwitterShareClicked = (): void => {
    window.open('https://twitter.com/intent/tweet?url=https%3A%2F%2Feverysize.kibalabs.com&related=kibalabs&text=Check%20out%20everysize%20by%20@kibalabs%20to%20test%20your%20responsive%20site%20in%20every%20size%20%20🖥%20💻%20📱', 'Data', 'height=350,width=750');
  };

  React.useEffect((): void => {
    if (size) {
      // s-p / c+p > n
      setTotalWidth(Math.floor((size.width - paddingSize) / (columnWidth + paddingSize)) * (columnWidth + paddingSize) - (2 * paddingSize));
    }
  }, [size]);

  return (
    <React.Fragment>
      <GridPageWrapper ref={gridRef}>
        <NavbarWrapper>
          <NavBar url={url!} onUrlChanged={onUrlChanged} onTwitterShareClicked={onTwitterShareClicked}/>
        </NavbarWrapper>
        <GridWrapper>
          <Grid
            rowHeight={rowHeight}
            columnWidth={columnWidth}
            paddingSize={paddingSize}
            totalWidth={totalWidth}
            minimumGridItemWidth={minimumGridItemWidth}
            columnCount={columnCount}
            url={url!}
            boxes={boxes}
            onBoxCloseClicked={onRemoveBoxClicked}
            onBoxSizeChanged={onBoxSizeChanged}
            onBoxPositionChanged={onBoxPositionChanged}
          />
        </GridWrapper>
        <Footer />
      </GridPageWrapper>
      <FloatingActionButton onClicked={onAddClicked}/>
    </React.Fragment>
  );
}
