
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          event_title: 'Party in the Conference Room',
          event_description: "To celebrate our new application, we're going to be putting on a dance party and cake eating festival in the conference room",
          event_budget: '2000',
          event_location: 'Conference Room 204',
          event_start: '2019-08-29T07:07:07.357Z',
          event_end: '2019-08-27T09:07:07.357Z',
          event_users: ''
        }
      ]);
    });
};
