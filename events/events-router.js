const express = require('express')

const router = express.Router()
const Events = require('./events-model.js')

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
      response.status(200).json(event)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})


//// Available to Admins, Managers
// router.post
router.post('/', (request, response) => {
  let { event } = request.body

  console.log(event)

  Events.createEvent(event)
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

//// Available to added users
// router.put


module.exports = router