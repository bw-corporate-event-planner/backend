const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.DB_ENV || 'development';

const db = knex(knexConfig[environment])

module.exports = {
  findVendors,
  findVendorID,
  createVendor,
  editVendor,
  deleteVendor
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
    .returning('*')
}

function editVendor(changes, id) {
  return db('vendors')
    .where('id', '=', id)
    .update(changes)
    .returning('*')
}

function deleteVendor(id) {
  return db('vendors')
    .where('id', '=', id)
    .del()
}