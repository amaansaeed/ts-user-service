import knex from 'knex';

interface User {
  user_id: string;
  name: string;
  profile?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

function getAll(knex: knex) {
  return (): Promise<User[]> =>
    new Promise<User[]>((resolve, reject) => {
      knex('users')
        .select('*')
        .then(resolve)
        .catch(reject);
    });
}

function getById(knex: knex) {
  return (id: string): Promise<User[]> =>
    new Promise<User[]>((resolve, reject) => {
      knex('users')
        .select('*')
        .where({ user_id: id })
        .then(res => resolve(res[0] ? res[0] : {}))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
}

export default (knex: knex) => ({
  getAll: getAll(knex),
  getById: getById(knex),
});
