import React from 'react';
import { EveryviewTracker } from './everyview';


export const EveryviewContext = React.createContext<EveryviewTracker | null>(null);

interface IEveryviewProviderProps {
  tracker: EveryviewTracker;
  children: React.ReactChild
}

export const EveryviewProvider = (props: IEveryviewProviderProps): React.ReactElement => (
  <EveryviewContext.Provider value={props.tracker}>
    {props.children}
  </EveryviewContext.Provider>
);

export function useTracker(): EveryviewTracker {
  const tracker = React.useContext(EveryviewContext);
  if (!tracker) {
    throw Error('No tracker has been set!');
  }
  return tracker;
}

export function usePageView(path?: string, queryString?: string): void {
  const tracker = useTracker();
  const pathValue = path || window.location.pathname;
  const queryStringValue = queryString || window.location.search;
  React.useEffect((): void => {
    tracker.trackPageOpen(pathValue, queryStringValue);
  }, []);
}
