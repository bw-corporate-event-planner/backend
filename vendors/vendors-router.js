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

module.exports = router