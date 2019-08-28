const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.DB_ENV || 'development';

const db = knex(knexConfig[environment])

module.exports = {
  findVendors,
  findVendorID,
  createVendor
}

function findVendors() {
  return db('vendors')
    .select('*')
}

function findVendorID(id) {
  return db('vendors')
    .where({ id })
    .first()
    .select('*')
}

function createVendor(vendor) {
  return db('vendors')
    .insert(vendor, 'id')
    .then(ids => {
      const [id] = ids
      return findVendorID(id)
        .first()
        .select('*')
    })
}