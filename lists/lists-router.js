const express = require('express')
const router = express.Router()

const Lists = require('./lists-model.js')

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

  Lists.createList()
    .then(list => {
      response.status(201).json(list)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'error creating shopping item' })
    })
})

module.exports = router