import server from '../src/index';
import request from 'supertest';
import db from '../src/db';
import { seed } from '../src/db/seeds/users_seed';

const createTables = () => {
  return db.knex.schema.createTable('users', table => {
    table.uuid('user_id').primary();
    table.string('name').notNullable();
    table.jsonb('profile').nullable();
    table.dateTime('created_at');
    table.dateTime('updated_at').nullable();
    table.dateTime('deleted_at').nullable();
  });
};

const cleanUp = () => {
  return db.knex.schema.dropTableIfExists('users');
};

describe('Routes: user', () => {
  beforeAll(async () => {
    await createTables();
    await seed(db.knex);
  });

  afterAll(async () => {
    await cleanUp();
    db.knex.destroy();
    server.close();
  });

  describe('GET /user/all', () => {
    it('should get all users', async () => {
      const response = await request(server).get('/user/all');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
    });
  });

  describe('GET /user/id/:id', () => {
    const idPass = '2cd42796-33ec-48dd-b6ba-a391ee600877';
    const idFail1 = 'bob';
    const idFail2 = '2cd42796-33ec-48cc-b6ba-a391ee600877';

    it('should get a user by a id', async () => {
      const response = await request(server).get(`/user/id/${idPass}`);
      expect(response.status).toBe(200);
      expect(response.body.user_id).toBeDefined();
      expect(response.body.name).toBeDefined();
    });

    it('should NOT get a user by an ivalid id', async () => {
      const res1 = await request(server).get(`/user/id/${idFail1}`);
      expect(res1.status).toBe(422);
      expect(res1.body.user_id).toBeUndefined();
      expect(res1.body.name).toBeUndefined();

      const res2 = await request(server).get(`/user/id/${idFail2}`);
      expect(res2.status).toBe(200);
      expect(res2.body.user_id).toBeUndefined();
      expect(res2.body.name).toBeUndefined();
    });
  });
});
