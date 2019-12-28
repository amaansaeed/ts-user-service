import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('users', table => {
    table.uuid('user_id').primary();
    table.string('name').notNullable();
    table.jsonb('profile').nullable();
    table.dateTime('created_at');
    table.dateTime('updated_at').nullable();
    table.dateTime('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('users');
}
