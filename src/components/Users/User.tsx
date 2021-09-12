import { useCallback, useContext, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { UsersContext } from 'context/Users';

import type { VFC } from 'react';

export const User: VFC<{}> = () => {
  const history = useHistory();
  const { users, error, loading, dispatch } = useContext(UsersContext);
  const { userId } = useParams<{ userId?: string }>();

  /** Finds the user for the current page; undefined if a user enters an invalid user id. */
  const user = useMemo(() => users.find(u => u.id === Number(userId)), [users, userId]);

  const deleteUser = useCallback(() => {
    if (!user) return;

    dispatch({ type: 'DELETE', payload: user });
    history.push('/', { deletedUser: user }); // Back to the users list with the user we just deleted.
  }, [history, dispatch, user]);

  if (loading) return <h3>Loading…</h3>;
  if (!user) return <h3>User {userId} not found.</h3>

  return (
    <div>
      {error && <h4>Error: {error}</h4>}

      <ul>
        <li>id: {user.id}</li>
        <li>name: {user.name}</li>
        <li>email: {user.email}</li>
      </ul>

      <button onClick={deleteUser}>Delete</button>
    </div>
  );
}
