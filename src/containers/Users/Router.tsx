import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { Users, User } from 'components/Users';

import { UsersProvider, UsersContext } from 'context/Users';

import type { ReactNode, VFC } from 'react';
import type { Context } from 'context/Users';

export const UsersRouter: VFC<{ children?: ReactNode }> = ({ children }) => (
  <UsersProvider>
    <BrowserRouter basename="/users">
      <ul>
        <li><Link to="/">Users</Link></li>
      </ul>

      {children}

      <UsersContext.Consumer>
        {({ users, loading, error, refresh }: Context) => (
          <>
            <h3>Users: {users.length}</h3>

            <button onClick={() => refresh()}>Refresh Users</button>

            {loading && <h4>Loading…</h4>}
            {error && <h4>error: {error}</h4>}

            <Switch>
              <Route path="/:userId">
                <User />
              </Route>
              <Route path="/">
                <Users />
              </Route>
            </Switch>
          </>
        )}
      </UsersContext.Consumer>
    </BrowserRouter>
  </UsersProvider>
)
