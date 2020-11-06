import React from 'react';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import { useFavicon } from '@kibalabs/core-react';
import { Requester } from '@kibalabs/core';
import { EveryviewTracker, EveryviewClient } from '@kibalabs/everyview-tracker';
import { EveryviewProvider } from '@kibalabs/everyview-tracker-react';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { GridPage } from './gridPage';

ReactGA.initialize('UA-31771231-10');
const tracker = new EveryviewTracker('f88fde06d2e94fd6bf4c917907e87480');
// const tracker = new EveryviewTracker('f88fde06d2e94fd6bf4c917907e87480', false, false, new EveryviewClient(new Requester(), 'http://localhost:5001'));
tracker.trackApplicationOpen();

export const App = (): React.ReactElement => {
  useFavicon('/assets/favicon.svg');

  return (
    <EveryviewProvider tracker={tracker}>
      <React.Fragment>
        <Helmet>
          <meta charSet='utf-8' />
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <title>everysize - Check your responsive site in every size 🖥 💻 📱</title>
          <meta name='description' content='' />
          <link rel='canonical' href='https://everysize.kibalabs.com' />
          <link href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900' rel='stylesheet' />
          <meta property='og:image' content='https://everysize.kibalabs.com/assets/banner.png' />
          <meta property='og:site_name' content='everysize' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='everysize' />
          <meta property='og:description' content='Check your responsive site in every size 🖥 💻 📱' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='everysize' />
          <meta name='twitter:image' content='https://everysize.kibalabs.com/assets/banner.png' />
          <meta name='twitter:description' content='Check your responsive site in every size 🖥 💻 📱' />
        </Helmet>
        <GlobalCss
          resetCss={resetCss}
        />
        <GridPage />
      </React.Fragment>
    </EveryviewProvider>
  );
}
