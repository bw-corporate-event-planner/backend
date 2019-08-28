
exports.up = function(knex) {
  return knex.schema
    .createTable('roles', roles => {
      roles.increments();
      roles.string('role_name', 128)
        .notNullable()
        .unique()
    })
    .createTable('users', users => {
      users.increments();
      users.string('email', 255)
        .notNullable()
        .unique()
      users.string('username', 128)
        .notNullable()
        .unique()
      users.string('password', 128)
        .notNullable()
      users.integer('role_id')
        .unsigned()
        .references('roles.id')
    })
    .createTable('events', events => {
      events.increments();
      events.string('event_title', 255)
        .notNullable()
        .unique()
      events.text('event_description')
        .notNullable()
      events.float('event_budget')
        .notNullable()
      events.string('event_location', 255)
        .defaultTo(null)
      events.datetime('event_start')
        .defaultTo(null)
      events.datetime('event_end')
        .defaultTo(null)
      events.integer('event_users')
        .unsigned()
        .references('users.id')
    })
    .createTable('vendors', vendors => {
      vendors.increments()
      vendors.text('vendor_name')
        .unique()
        .notNullable()
    })
    .createTable('lists', lists => {
      lists.increments();
      lists.integer('event_id')
        .unsigned()
        .references('events.id')
        .onUpdate('cascade')
        .onDelete('cascade')
      lists.text('item_name')
        .notNullable()
      lists.float('item_cost')
        .notNullable()
      lists.boolean('item_complete')
        .defaultTo(false)
      lists.integer('item_vendor')
        .unsigned()
        .references('vendors.id')
        .onUpdate('cascade')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('lists')
    .dropTableIfExists('vendors')
    .dropTableIfExists('events')
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
};
