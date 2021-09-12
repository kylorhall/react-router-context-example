import { StrictMode } from 'react';
import { render } from 'react-dom';
import './global.css';

import { Router } from 'components/Router';

render(
  <StrictMode>
    <Router />
  </StrictMode>,
  document.getElementById('root')
);
