import { useCallback, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { UsersContext } from 'context/Users';
import type { User } from 'context/Users';

import type { VFC } from 'react';

export const Users: VFC<{}> = () => {
  const location = useLocation<{ deletedUser: User }>();
  const { users, loading, error, dispatch } = useContext(UsersContext);

  const showRestore = useMemo(() => {
    if (!location.state?.deletedUser) return false;
    // If the user still exists in the array (eg. we just restored it, don't show it)
    // There's a far more performant way of doing this (during the restore action), but easy workaround with a very small array of users.
    if (users.some(user => user.id === location.state.deletedUser.id)) return false;

    return true;
  }, [users, location.state?.deletedUser]);

  const restoreUser = useCallback(() => {
    if (!showRestore) return;
    
    dispatch({
      type: 'ADD',
      payload: location.state.deletedUser,
    });
  }, [showRestore, dispatch, location.state?.deletedUser])

  if (loading) return <h3>Loading…</h3>;

  return <div>
    {showRestore && (
      <>
        <h4>Deleted user {location.state.deletedUser.name} ({location.state.deletedUser.id})!</h4>
        <button onClick={restoreUser}>Restore User {location.state.deletedUser.id}</button>
      </>
    )}

    {error && <h4>Error: {error}</h4>}

    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link to={`/${user.id}`}>{user.id}: {user.name}</Link>
        </li>
      ))}
    </ul>
  </div>;
}
