import React from 'react';
import { Helmet } from 'react-helmet';
import { useFavicon } from '@kibalabs/core-react';
import { EveryviewTracker } from '@kibalabs/everyview-tracker';
import { EveryviewProvider } from '@kibalabs/everyview-tracker-react';
import { buildTheme, KibaApp } from '@kibalabs/ui-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';

import { GridPage } from './gridPage';

const tracker = new EveryviewTracker('f88fde06d2e94fd6bf4c917907e87480');
tracker.trackApplicationOpen();

const theme = buildTheme({
  "colors": {
    "backgroundDark": "#333333"
  },
  "alternateColors": {
    "inverse": {
      "brandPrimary": "rgb(238, 238, 238)",
      "background": "#333333"
    }
  },
  "fonts": {
    "main": {
      "url": "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&display=swap"
    }
  },
  "texts": {
    "default": {
      "font-family": "Montserrat, apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
    },
    "note": {
      "color": "$colors.textClear10"
    }
  },
  "inputWrappers": {
    "default": {
      "normal": {
        "default": {
          "background": {
            "background-color": "$colors.backgroundLight10"
          }
        }
      }
    }
  },
  "boxes": {
    "navbar": {
      "border-radius": "0px",
      "box-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      "background-color": "$colors.background"
    },
    "gridItem": {
      "box-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      "background-color": "$colors.backgroundDark"
    }
  }
});

export const App = hot((): React.ReactElement => {
  useFavicon('/assets/favicon.svg');

  return (
    <KibaApp theme={theme}>
      <EveryviewProvider tracker={tracker}>
        <React.Fragment>
          <Helmet>
            <meta charSet='utf-8' />
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <title>everysize - Check your responsive site in every size 🖥 💻 📱</title>
            <meta name='description' content='' />
            <link rel='canonical' href='https://everysize.kibalabs.com' />
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
          <GridPage />
        </React.Fragment>
      </EveryviewProvider>
    </KibaApp>
  );
});
