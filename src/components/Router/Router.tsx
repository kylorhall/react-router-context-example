import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { User } from '../User';
import { Users } from '../Users';

import { UsersProvider } from '../../context/Users';

import type { ReactNode, VFC } from 'react';

export const Router: VFC<{ children?: ReactNode }> = ({ children }) => (
  <UsersProvider>
    <BrowserRouter>
      <ul>
        <li><Link to="/users">Users</Link></li>
      </ul>

      {children}

      <Switch>
        <Route path="/users/:userId">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </BrowserRouter>
  </UsersProvider>
)
