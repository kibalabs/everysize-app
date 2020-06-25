import React from 'react';
import styled from 'styled-components';
import { useBooleanLocalStorageState, useSizingRef, useLocalStorageState, useUrlQueryState, useStringListLocalStorageState, useValueSync } from '@kibalabs/core-react';
import { usePageView, useTracker } from '@kibalabs/everyview-tracker-react';

import { NavBar } from './components/navBar';
import { Grid } from './components/grid';
import { IBox, deserializeBox, serializeBox, defaultLayout, createDefaultDevice } from './model';
import { FloatingActionButton } from './components/floatingActionButton';
import { EmailBanner } from './components/emailBanner';
import { Footer } from './components/footer';


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
    return null;
  }
  return boxes.map((box: IBox): string => serializeBox(box));
}

export const useBoxListLocalStorageState = (name: string, delimiter: string = ',', overrideInitialValue?: IBox[] | null): [IBox[], (newValue: IBox[] | null) => void] => {
  const [value, setValue] = useStringListLocalStorageState(name, delimiter, overrideInitialValue !== undefined ? boxListToStringList(overrideInitialValue) : undefined);
  return [boxListFromStringList(value), ((newValue: IBox[] | null): void => setValue(boxListToStringList(newValue)))];
};

export const GridPage = (): React.ReactElement => {
  console.log('here');
  usePageView('grid');
  console.log('here2');
  const tracker = useTracker();
  console.log('here3');
  const [size, gridRef] = useSizingRef<HTMLDivElement>();
  const [hideEmailBanner, setHideEmailBanner] = useBooleanLocalStorageState('hide_email_banner');
  const [boxes, setBoxes] = useBoxListLocalStorageState('boxes_v2');
  const [url, setUrl] = useUrlQueryState('url');
  const [storedUrl, setStoredUrl] = useLocalStorageState('url_v1', url);
  const [startTime, setStartTime] = React.useState<Date>(new Date());
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
    tracker.trackFormSubmit('url_form', undefined, url);
    setStoredUrl(url);
  };

  const onAddClicked = (): void => {
    tracker.trackButtonClick('add_box');
    setBoxes([...boxes, createDefaultDevice()]);
  };

  const onRemoveBoxClicked = (itemId: string): void => {
    tracker.trackButtonClick('remove_box');
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  };

  const onBoxSizeChanged = (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => {
    // Prevent sending events for initial loading movement
    if ((new Date()).getTime() - startTime.getTime() > 1000) {
      if (deviceCode) {
        tracker.track('change_box_device', deviceCode || 'manual', zoom);
      } else {
        tracker.track('change_box_manual', String(zoom), width, undefined, height);
      }
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
    tracker.trackButtonClick('twitter_share');
    window.open('https://twitter.com/intent/tweet?url=https%3A%2F%2Feverysize.kibalabs.com&related=kibalabs&text=Check%20out%20everysize%20by%20@kibalabs%20to%20test%20your%20responsive%20site%20in%20every%20size%20%20🖥%20💻%20📱', 'Data', 'height=350,width=750');
  };

  React.useEffect((): void => {
    if (size) {
      setTotalWidth(Math.floor((size.width - paddingSize) / (columnWidth + paddingSize)) * (columnWidth + paddingSize) - (2 * paddingSize));
    }
  }, [size]);

  const onEmailBannerCloseClicked = (): void => {
    tracker.trackButtonClick('email_banner_close');
    setHideEmailBanner(true);
  }

  const onEmailBannerSubmitted = (): void => {
    tracker.trackFormSubmit('email_form');
    setHideEmailBanner(true);
  }

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
        { !hideEmailBanner && (
          <EmailBanner onCloseClicked={onEmailBannerCloseClicked} onEmailSubmitted={onEmailBannerSubmitted}/>
        )}
        <Footer />
      </GridPageWrapper>
      <FloatingActionButton onClicked={onAddClicked} bottomOffset={hideEmailBanner ? '20px' : '80px'} />
    </React.Fragment>
  );
}
