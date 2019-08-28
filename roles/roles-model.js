const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  find,
  findRole,
}

function find() {
  return db('roles')
    .select('*')
}

function findRole(filter) {
  return db('roles')
    .where(filter)
    .select('id')
}