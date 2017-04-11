// Users:
// name - string
// isAdmin - string or boolean?
// email - string
// password - string
// address - string
// date - datetime

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.text('name').notNullable();
        table.boolean('isAdmin').defaultTo(false).notNullable();
        table.text('email').notNullable();
        table.text('password').notNullable();
        table.text('address');
        table.datetime('date').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
