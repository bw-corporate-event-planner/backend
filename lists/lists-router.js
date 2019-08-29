const express = require('express')
const router = express.Router()

const Lists = require('./lists-model.js')
const Vendors = require('../vendors/vendors-model.js')

router.get('/', (request, response) => {
  Lists.findLists()
    .then(lists => {
      response.status(200).json(lists)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'error retriving lists from server' })
    })
})

router.post('/', (request, response) => {
  const newItem = request.body
  console.log(newItem)

  Lists.createList(newItem)
    .then(list => {
      console.log('testing this console.log', list)
      response.status(201).json(list)
    })
    .catch(error => {
      console.log('test this error', error)
      response.status(500).json({ message: 'error creating shopping item' })
    })
})

router.put('/:id', (request, response) => {
  const changes = request.body
  const id = request.params.id

  Lists.changeList(changes, id)
    .then(update => {
      response.status(200).json(update)
    })
    .catch(error => {
      response.status(500).json({ message: 'Issues with modifying list item' })
    })
})

module.exports = router