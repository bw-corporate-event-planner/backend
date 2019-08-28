
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      // Inserts seed entries
      return knex('lists').insert([
        {
          event_id: '1',
          item_name: 'Cake',
          item_cost: '200',
          item_complete: false,
          item_vendor: '2'
        },
        {
          event_id: '1',
          item_name: 'Party Poppers',
          item_cost: '400',
          item_complete: false,
          item_vendor: '1'
        },
        {
          event_id: '1',
          item_name: 'Dance Floor',
          item_cost: '1000',
          item_complete: true,
          item_vendor: '4'
        }
      ]);
    });
};
