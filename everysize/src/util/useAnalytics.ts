import React from 'react';
import ReactGA from 'react-ga';

export function usePageView(location?: string): void {
  if (typeof window === 'undefined') {
    console.warn('Cannot use usePageView without a window present!')
    return;
  }

  const page = location ? location : window.location.pathname + window.location.search;
  React.useEffect((): void => {
    ReactGA.pageview(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const trackEvent = (category: string, action: string, label?: string, value?: number): void => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value,
  });
}
