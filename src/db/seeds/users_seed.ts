import * as Knex from 'knex';

const createdAt = new Date();

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id: 'a61b52a5-6905-4de4-b17e-494436187c6a',
          name: 'Hobbes Shelby',
          created_at: createdAt,
        },
        {
          user_id: '2cd42796-33ec-48dd-b6ba-a391ee600877',
          name: 'Calvin el Tigre',
          created_at: createdAt,
        },
        {
          user_id: '80348fde-44cf-42d5-8b34-5369b5be6736',
          name: 'Rumi Da Poet',
          created_at: createdAt,
        },
      ]);
    });
}
