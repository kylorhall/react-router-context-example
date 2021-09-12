import type { Dispatch } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
}

export type AddAction = { type: 'ADD'; payload: User };
export type InitAction = { type: 'INIT'; payload: User[] };
export type DeleteAction = { type: 'DELETE'; payload: User };
export type UpdateAction = { type: 'UPDATE'; payload: User };

export type Action = AddAction | InitAction | DeleteAction | UpdateAction;

export interface Context {
  /** NOTE: Error is not actually hooked up… */
  error?: string;

  /** Users will be an empty array when `loading=true`. */
  loading: boolean;

  /** The users state. */
  users: User[];

  /** Dispatch an action to the users */
  dispatch: Dispatch<Action>;

  /** Refresh the users state from API in the background.
   * NOTE: Does not set `loading`.
   */
  refresh: () => void;
}
