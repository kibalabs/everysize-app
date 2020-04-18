import React from 'react';
import { Root } from 'react-static'
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';

import { useFavicon } from './util';
import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { GridPage } from './gridPage';
// import favicon from 'assets/favicon.svg';

const favicon = require('assets/favicon.svg');

ReactGA.initialize('UA-31771231-10');

export const App = (): React.ReactElement => {
  useFavicon(favicon);

  return (
    <Root>
      <Helmet>
        <meta charSet='utf-8' />
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <title>everysize - Check your responsive site in every size in one go 🖥 💻 📱</title>
        <meta name='description' content='' />
        <link rel='canonical' href='https://everysize.kibalabs.com' />
        <link href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900' rel='stylesheet' />
        <meta property="og:image" content="https://ogi.sh?Hello%20World" />
        <meta property="og:site_name" content="everysize" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="everysize" />
        <meta property="og:description" content="Check your responsive site in every size in one go 🖥 💻 📱" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="everysize" />
        <meta name="twitter:image" content="https://ogi.sh?Hello%20World" />
        <meta name="twitter:description" content="Check your responsive site in every size in one go 🖥 💻 📱" />
      </Helmet>
      <GlobalCss
        resetCss={resetCss}
      />
      <GridPage />
    </Root>
  );
}
