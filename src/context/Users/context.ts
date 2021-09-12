import { createContext } from 'react';
import { Context, Action } from './types'

export const defaultUsersContext = {
  loading: true,
  error: undefined,
  users: [],
  dispatch: (action: Action) => {
    throw new Error(`WARNING: UsersContext.dispatch attempted to fire with type=${action.type} before initialized by a provider.`)
  },
  refresh: () => {
    throw new Error(`WARNING: UsersContext.refresh was called before initialized by a provider.`);
  },
};

export const UsersContext = createContext<Context>(defaultUsersContext);
