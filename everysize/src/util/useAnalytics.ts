import React from 'react';
import ReactGA from 'react-ga';
import { Mixpanel } from 'mixpanel-browser';

export const MixpanelContext = React.createContext<Mixpanel | null>(null);

export function usePageView(location?: string): void {
  const mixpanel = React.useContext(MixpanelContext);
  const page = location ? location : window.location.pathname + window.location.search;
  React.useEffect((): void => {
    ReactGA.pageview(page);
    mixpanel!.track(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const trackEvent = (mixpanel: Mixpanel, category: string, action: string, label?: string, value?: number): void => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value,
  });
  mixpanel.track('event', {
    category: category,
    action: action,
    label: label,
    value: value,
  });
}
