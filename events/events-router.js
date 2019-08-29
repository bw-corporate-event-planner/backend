const express = require('express')

const router = express.Router()
const Events = require('./events-model.js')
const Vendors = require('../vendors/vendors-model.js')

//// Available to all users
router.get('/', (request, response) => {
  Events.findEvents()
    .then(events => {
      response.status(200).json(events)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})

router.get('/:id', (request, response) => {
  let id = request.params.id

  Events.findEventsID(id)
    .then(event => {
      if (event) {
        console.log(event)
        response.status(200).json(event)
      } else {
        response.status(404).json({ message: 'Event with this id not found' })
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})


//// Available to Admins, Managers
// router.post
router.post('/', (request, response) => {
  let event = request.body

  console.log('checking post event', event)

  Events.createEvent(event)
    .then(event => {
      response.status(200).json(event)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})

//// Available to added users
router.put('/:id', (request, response) => {
  let changes = request.body
  let id = request.params.id

  Events.changeEvent(changes, id)
    .then(event => {
      response.status(200).json(event)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})

// router.delete
// router.delete('/:id', (request, response) => {
//   let id = request.params.id

//   Events.removeEvent(id)
// })


module.exports = router