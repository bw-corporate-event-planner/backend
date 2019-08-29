const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.DB_ENV || 'development';

const db = knex(knexConfig[environment])

module.exports = {
  findUserId,
  create,
  findUser,
  find,
  getMe
}

function findUserId(id) {
  return db('users')
    .where({ id })
    .first()
}

function create(user) {
  return db('users')
  .insert(user, 'id')
  .then(ids => {
    const [id] = ids;
    return findUserId(id)
      .select('id', 'username', 'role_id')
  })
}

function findUser(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'role_id')
}

function find() {
  return db('users')
    .select('id', 'username', 'role_id')
}

function getMe(user) {
  return db('users')
    .where({username: user})
    .select('id', 'username', 'role_id')
}