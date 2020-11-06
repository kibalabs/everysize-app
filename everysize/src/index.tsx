import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './App';
export default App;

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');
  if (!target) {
    throw Error('document must have a root element!');
  }
  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
  const render = (Component: React.ComponentType) => (
    renderMethod(<AppContainer><Component /></AppContainer>, target)
  );
  render(App)
  if (module && module.hot) {
    module.hot.accept('./App', () => render(App));
  }
}
