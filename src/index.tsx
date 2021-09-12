import { StrictMode } from 'react';
import { render } from 'react-dom';
import './global.css';

import { App } from 'containers/App';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
