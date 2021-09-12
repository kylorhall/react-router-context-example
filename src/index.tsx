import { StrictMode } from 'react';
import { render } from 'react-dom';
import './global.css';

import { UsersRouter } from 'containers/Users';

render(
  <StrictMode>
    <UsersRouter />
  </StrictMode>,
  document.getElementById('root')
);
