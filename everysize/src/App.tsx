import React from 'react';

import { ResizableBox } from './resizableBox';
import { WebView } from './webView';

function App() {
  return (
    <React.StrictMode>
      <div>Welcome to everysize!</div>
      <ResizableBox>
        <WebView url='https://kiwidocs.co' errorView={<div>Error</div>}/>
      </ResizableBox>
    </React.StrictMode>
  );
}

export default App;
