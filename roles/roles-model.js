const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.DB_ENV || 'development';

const db = knex(knexConfig[environment])

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