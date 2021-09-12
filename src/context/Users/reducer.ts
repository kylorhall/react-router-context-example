import axios from 'axios';

import { AddAction, DeleteAction, UpdateAction, InitAction, User, Action } from './types'

export const usersReducer = (users: User[] | undefined = [], { type, payload } : Action): User[] => {
  switch (type) {
    // Append a User.
    case 'ADD':
      const createUser = (payload as AddAction['payload']);

      // NOTE: You'd probably await this or have multiple dispatches before/after async to temporarily and finally update.
      axios.post(`https://jsonplaceholder.typicode.com/users`, createUser);

      return [...users, createUser];

    // Delete the User from the state.
    case 'DELETE':
      const deleteUser = (payload as DeleteAction['payload']);

      // NOTE: You'd probably await this or have multiple dispatches before/after async to temporarily and finally update.
      axios.delete(`https://jsonplaceholder.typicode.com/users/${deleteUser.id}`);

      return users.filter(user => user.id !== deleteUser.id);

    // Update/Replace a User; this returns the payload in its place, does not merge.
    case 'UPDATE':
      const updateUser = (payload as UpdateAction['payload']);

      // NOTE: You'd probably await this or have multiple dispatches before/after async to temporarily and finally update.
      axios.put(`https://jsonplaceholder.typicode.com/users/${updateUser.id}`, updateUser);

      return users.map(user => {
        if (user.id === updateUser.id) return updateUser;
        return user;
      });

    case 'INIT':
      // Override the entire Users state, eg. on initialization
      return (payload as InitAction['payload']);

    default:
      throw new Error(`Unknown action passed to UsersReducer: ${type}.`)
  }
}
