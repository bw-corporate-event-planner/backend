const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.DB_ENV || 'development';

const db = knex(knexConfig[environment])

module.exports = {
  findEvents,
  findEventsID,
  // findEventsUser,
  createEvent
  // modifyEvent add after other CRUD
}

function findEvents() {
  return db('events')
    .select('*')
}


//// this is going to require a vendor join as well based upon vendor ids
/////// old code
  // db('events')
  //   .where({ id })
  //   .first()
  //   .then(event => {
  //     return db('lists')
  //       .where({ })
  //   })
  //   .join('lists','lists.event_id', '=', 'events.id')
  //   .where({ id })
  //   .first()
  //   .select('*')
// function findEventsID(id) {
//   db('events').where({id}).first()
//     .then(event => {
//       return db('lists').where({eventid: id}).join('vendors')
//         .then(items => {
//           return {...event, items: items};
//         });
//     });
// }

function findEventsID(id) {
  console.log(id)
  return Promise.all
  ([db('events').where({id}).first(), 
    db('lists').where({eventid: id}).join('vendors')],
    ([event, items]) => {
      return {...event, items: items};
    });
}

// function findEventsUser(userID) {
//   return db('events')
//     .where()
// }
////// Where user is included in list
/// event_users includes id

function createEvent(newEvent) {
  return db('events')
    .insert(newEvent, 'id')
    .then(ids => {
      const [id] = ids;
      return findEventsID(id)
        .select('*')
    })
}