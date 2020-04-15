import React from 'react';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import { useFavicon, MixpanelContext } from './util';
import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { GridPage } from './gridPage';
import favicon from './assets/favicon.svg';

ReactGA.initialize('UA-31771231-10');
mixpanel.init('7fc4d95d4dc75d9841828257737030ee');

export const App = (): React.ReactElement => {
  useFavicon(favicon);

  return (
    <MixpanelContext.Provider value={mixpanel}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>everysize - Check your responsive site in every sizes in one go!</title>
        <meta name='description' content='' />
        <link rel='canonical' href='https://everysize.kibalabs.com' />
        <link href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900' rel='stylesheet' />
      </Helmet>
      <GlobalCss
        resetCss={resetCss}
      />
      <GridPage />
    </MixpanelContext.Provider>
  );
}
