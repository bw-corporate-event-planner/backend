const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()
const Users = require('./user-model.js')
const Roles = require('../roles/roles-model.js')
const restricted = require('../middleware/restricted.js')

//// Login and Registration routes
router.post('/register', (request, response) => {
  let newUser = request.body
  const hash = bcrypt.hashSync(newUser.password)
  newUser.password = hash

  if (newUser.role_id) {
    Roles.findRole(newUser.role_id)
    .then(role => {
      newUser.role_id = role
      console.log(newUser)
      Users.create(newUser)
        .then(created => {
          response.status(201).json(created)
        })
        .catch(error => {
          console.log(error)
          response.status(500).json(error)
        })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'error creating user on server' })
    })
  } else {
    response.status(404).json({ message: 'please send a role id with new users' })
  }

})

router.post('/login', (request, response) => {
  let { username, password } = request.body
  console.log(request.body)
  console.log(username)

  if (username && password) {
    Users.findUser({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        request.session.username = user.username // adding username to the session cookie
        request.session.loggedIn = true // Set info as logged in to true
        response.status(200).json({ message: `Welcome, ${user.username}` })
      } else {
        response.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Issues logging in with server' })
    })
  } else {
    response.status(400).json({ message: 'Please include username and password with request' })
  }
})

router.get('/logout', restricted, (request, response) => {
  request.session.destroy(() => {
    response.status(200).json({ message: 'You have been logged out' })
  })
})

//// Get list of users
router.get('/users', (request, response) => {
  Users.find()
    .then(users => {
      response.json(users)
    })
    .catch(error => {
      console.log(error)
      response.send(error)
    })
})


module.exports = router