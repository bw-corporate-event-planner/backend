const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.DB_ENV || 'development';

const db = knex(knexConfig[environment])

module.exports = {
  findUserId,
  create,
  findUser,
  find
}

function findUserId(id) {
  return db('users')
    .where({ id })
    .first()
}

function create(user) {
  console.log(user.role_id)
  // return db('roles')
  //   .filter('user.role_id')
  //   .select('id')
  //   .then(roleID => {
  //     user.role_id = roleID
      return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findUserId(id)
          .select('id', 'username', 'role_id')
      })
    // })
}

function findUser(filter) {
  return db('users')
    .where(filter)
}

function find() {
  return db('users')
    .select('id', 'username', 'role_id')
}