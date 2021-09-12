import { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { UsersContext } from 'context/Users';
import type { User } from 'context/Users';

import type { VFC } from 'react';

export const Users: VFC<{}> = () => {
  const location = useLocation<{ deleted: User }>();
  const { users, dispatch, refresh } = useContext(UsersContext);

  const showRestore = useMemo(() => {
    if (!location.state?.deleted) return false;
    // If the user still exists in the array (eg. we just restored it, don't show it)
    // There's a far more performant way of doing this (during the restore action), but easy workaround with a very small array of users.
    if (users.some(user => user.id === location.state.deleted.id)) return false;

    return true;
  }, [users, location.state?.deleted]);

  return <div>
    <h3>Users: {users.length}</h3>

    {showRestore && (
      <>
        <h4>Deleted user {location.state.deleted.name} ({location.state.deleted.id})!</h4>
        <button onClick={() => dispatch({ type: 'ADD', payload: location.state.deleted })}>Restore User {location.state.deleted.id}</button>
      </>
    )}

    <button onClick={() => refresh()}>Refresh Users</button>

    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.id}: {user.name}</Link>
        </li>
      ))}
    </ul>
  </div>;
}
