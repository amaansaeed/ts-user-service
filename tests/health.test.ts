import server from '../src/index';
import request from 'supertest';

describe('User Service: Health', () => {
  beforeAll(() => {});

  afterAll(() => {
    server.close();
  });

  describe('GET /user/health', () => {
    it('should return server healthy', async () => {
      const response = await request(server).get('/user/health');
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('server healthy!');
    });
  });
});
