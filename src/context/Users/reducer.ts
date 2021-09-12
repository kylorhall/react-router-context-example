import { AddAction, DeleteAction, UpdateAction, InitAction, User, Action } from './types'

export const usersReducer = (users: User[] | undefined = [], { type, payload } : Action): User[] => {
  switch (type) {
    case 'ADD':
      // Append a User.
      return [...users, (payload as AddAction['payload'])];

    case 'DELETE':
      // Delete a User.
      return users.filter(user => user.id !== (payload as DeleteAction['payload']).id);

    case 'UPDATE':
      // Update/Replace a User; this returns the payload in its place, does not merge.
      return users.map(user => {
        if (user.id === (payload as UpdateAction['payload']).id) return (payload as UpdateAction['payload']);
        return user;
      });

    case 'INIT':
      // Override the entire Users state, eg. on initialization
      return (payload as InitAction['payload']);

    default:
      throw new Error(`Unknown action passed to UsersReducer: ${type}.`)
  }
}
