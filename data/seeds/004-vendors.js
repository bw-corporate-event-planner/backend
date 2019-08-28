
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vendors').del()
    .then(function () {
      // Inserts seed entries
      return knex('vendors').insert([
        {
          vendor_name: 'Starbucks'
        },
        {
          vendor_name: 'Zimmermans'
        },
        {
          vendor_name: 'Home Depot'
        },
        {
          vendor_name: 'The Party Place'
        }
      ]);
    });
};
