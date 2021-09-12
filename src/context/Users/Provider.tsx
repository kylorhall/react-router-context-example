import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import axios from 'axios';

import { UsersContext, defaultUsersContext } from './context';
import { usersReducer } from './reducer';

import type { ReactNode, VFC } from 'react';

export const UsersProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState(defaultUsersContext.error);
  const [loading, setLoading] = useState(defaultUsersContext.loading);
  const [users, dispatch] = useReducer(usersReducer, defaultUsersContext.users);

  const initializeUsers = useCallback(async () => {
    try {
      const { data } = await axios('https://jsonplaceholder.typicode.com/users')

      dispatch({ type: 'INIT', payload: data });
      setError(undefined);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, setLoading, setError]);

  /** Load all users initially. */
  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);
  
  const contextValue = useMemo(() => ({
    users,
    error,
    dispatch,
    loading,
    refresh: initializeUsers,
  }), [users, error, dispatch, loading, initializeUsers])

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};
