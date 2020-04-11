import React from 'react';

import { ResizableBox } from './resizableBox';
import { WebView } from './webView';

function App() {
  const [url, setUrl] = React.useState<string>('https://kiwidocs.co')

  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  return (
    <React.StrictMode>
      <div>Welcome to everysize!</div>
      <input value={url} onChange={onUrlChanged}></input>
      <ResizableBox initialHeight='500px' initialWidth='1000px'>
        <WebView url={url} errorView={<div>Error</div>}/>
      </ResizableBox>
    </React.StrictMode>
  );
}

export default App;
