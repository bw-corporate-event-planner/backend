const bcyrpt = require('bcryptjs')


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'super@super.co',
          username: 'super',
          password: bcyrpt.hashSync('abcd1234', 12),
          role_id: '1'
        },
        {
          email: 'manager@manager.co',
          username: 'manager',
          password: bcyrpt.hashSync('abcd1234', 12),
          role_id: '2'
        },
        {
          email: 'user@user.co',
          username: 'user',
          password: bcyrpt.hashSync('abcd1234', 12),
          role_id: '3'
        }
      ]);
    });
};
