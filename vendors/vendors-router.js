const express = require('express')

const router = express.Router()
const Vendors = require('./vendors-model.js')

router.get('/', (request, response) => {
  console.log('hit the get')
  Vendors.findVendors()
    .then(vendors => {
      response.json(vendors)
    })
    .catch(error => {
      console.log(error)
      response.send(error)
    })
})

router.post('/', (request, response) => {
  let newVendor = request.body

  if (newVendor) {
    Vendors.createVendor(newVendor)
      .then(created => {
        response.status(201).json(created)
      })
      .catch(error => {
        console.log(error)
        response.status(500).json(error)
      })
  } else {
    response.status(404).json({ message: 'please include vendor_name with request' })
  }
})

router.put('/:id', (request, response) => {
  let changes = request.body
  let id = request.params.id

  Vendors.editVendor(changes, id)
    .then(updated => {
      response.status(200).json(updated)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})

router.delete('/:id', (request, response) => {
  let id = request.params.id

  Vendors.deleteVendor(id)
    .then(removed => {
      response.status(200).json({ message: `Vendor with id: ${id} has been removed` })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})

module.exports = router