import React from 'react';
import styled from 'styled-components';


const StyledWebView = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  -ms-overflow-style: none;
`;

const LoadingWrapper = styled.div`
  position: absolute;
`;

interface IStyledIframeProps {
  isLoading: boolean;
}

const StyledIframe = styled.iframe<IStyledIframeProps>`
  height: 100%;
  width: 100%;
  border: none;
  display: ${(props: IStyledIframeProps): string => (props.isLoading ? 'none' : 'inherit')};
`;

interface IWebViewProps {
  url: string;
  errorView: React.ReactElement;
  onLoaded: (isLoading: boolean) => void;
}


export const WebView = React.forwardRef((props: IWebViewProps, ref: React.Ref<HTMLIFrameElement>): React.ReactElement => {
  const [currentUrl, setCurrentUrl] = React.useState<string | undefined>(undefined);
  const [hasFailedToLoad, setHasFailedToLoad] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect((): void => {
    if (props.url !== currentUrl) {
      setIsLoading(true);
      setCurrentUrl(props.url);
      setHasFailedToLoad(false);
    }
  }, [props.url, currentUrl]);

  const handleOnError = (): void => {
    setIsLoading(false);
    setHasFailedToLoad(true);
  };

  const handleOnLoad = (event: React.SyntheticEvent<HTMLIFrameElement, Event>): void => {
    setIsLoading(false);
    // const iframe: HTMLIFrameElement = event.target as HTMLIFrameElement;
    // console.log(event, event.eventPhase, event.type);
    // console.log(iframe.contentWindow?.window?.length);
    // console.log(iframe.contentDocument?.body?.childElementCount);
    // setTimeout(function() {
    //   console.log(iframe.contentWindow?.window?.length);
    //   console.log(iframe.contentDocument);
    //   console.log(iframe.contentWindow?.document);
    //   if (!(iframe && iframe.contentWindow && iframe.contentWindow.window && iframe.contentWindow.window.length > 0)) {
    //     setHasFailedToLoad(true);
    //   } else {
    //     iframe.contentWindow.console.log = (): void => { /* no-op */ };
    //   }
    // }, 1000);
  };

  React.useEffect((): void => {
    props.onLoaded(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <StyledWebView
      className={'web-view'}
    >
      { hasFailedToLoad
        ? props.errorView
        : <React.Fragment>
          { isLoading && (<LoadingWrapper>Loading...</LoadingWrapper>)}
          <StyledIframe
            className={'web-view-iframe'}
            key={currentUrl}
            src={currentUrl}
            isLoading={isLoading}
            onLoad={handleOnLoad}
            onError={handleOnError}
            ref={ref}
          />
        </React.Fragment>
      }
    </StyledWebView>
  );
});

WebView.defaultProps = {
};
