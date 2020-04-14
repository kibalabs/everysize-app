import React from 'react';
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';


export const Analytics = (): React.ReactElement | null => {
  ReactGA.initialize('UA-31771231-10');
  mixpanel.init('7fc4d95d4dc75d9841828257737030ee');
  return null;
}
