const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.DB_ENV || 'development';

const db = knex(knexConfig[environment])

module.exports = {
  findLists,
  findListID,
  createList,
  changeList
}

function findLists() {
  return db('lists as l')
    .join('vendors as v', 'l.item_vendor', 'v.id')
    .select('l.id', 'l.event_id', 'l.item_name', 'l.item_cost', 'l.item_complete', 'v.vendor_name')
}

function findListID(id) {
  return db('lists')
    .where({ id })
    .first()
}

function createList(newList) {
  return db('lists')
    .insert(newList, 'id')
    .returning('*')
}

function changeList(changes, id) {
  return db('lists')
    .where('id', '=', id)
    .update(changes)
    .returning('*')
}
