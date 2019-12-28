import knex, { Config } from 'knex';
import users from './models/users';

class Connection {
  public knex = knex(exportConfig());
  public users = users(this.knex);
}

function exportConfig(): Config {
  const environment =
    !process.env.ENV || process.env.ENV === 'docker'
      ? 'development'
      : process.env.ENV;
  return require('../../knexfile')[environment];
}

export default new Connection();
