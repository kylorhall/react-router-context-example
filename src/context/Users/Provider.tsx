import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import axios from 'axios';

import { UsersContext, defaultUsersContext } from './context';
import { usersReducer } from './reducer';

import type { ReactNode, VFC } from 'react';

export const UsersProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(defaultUsersContext.loading);
  const [users, dispatch] = useReducer(usersReducer, defaultUsersContext.users);

  const initializeUsers = useCallback(async () => {
    const { data } = await axios('https://jsonplaceholder.typicode.com/users')

    dispatch({ type: 'INIT', payload: data });
    setLoading(false);
  }, [dispatch, setLoading]);

  /** Load all users initially. */
  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);
  
  const contextValue = useMemo(() => ({
    users,
    dispatch,
    loading,
    refresh: initializeUsers,
  }), [users, dispatch, loading, initializeUsers])

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};
