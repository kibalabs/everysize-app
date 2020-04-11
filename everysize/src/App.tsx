import React from 'react';

import { WebView } from './webView';
import { GridItem } from './gridItem';

function App() {
  const [url, setUrl] = React.useState<string>('https://kiwidocs.co');

  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  return (
    <React.StrictMode>
      <div>Welcome to everysize!</div>
      <input value={url} onChange={onUrlChanged}></input>
      <GridItem initialHeight={500} initialWidth={1000}>
        <WebView url={url} errorView={<div>Error</div>}/>
      </GridItem>
    </React.StrictMode>
  );
}

export default App;
