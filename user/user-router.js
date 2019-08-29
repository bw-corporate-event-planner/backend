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
  console.log(newUser)

  Users.create(newUser)
    .then(created => {
      request.session.userid = user.id
      request.session.username = user.username // adding username to the session cookie
      request.session.role = user.role_id
      request.session.loggedIn = true // Set info as logged in to true
      response.status(201).json(created)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})

router.post('/login', (request, response) => {
  let { username, password } = request.body
  console.log(request.body)
  console.log(username)

  if (username && password) {
    Users.findUser({ username })
    .first()
    .then(user => {
      console.log('.then user log', user)
      if (user && bcrypt.compareSync(password, user.password)) {
        request.session.userid = user.id
        request.session.username = user.username // adding username to the session cookie
        request.session.role = user.role_id
        request.session.loggedIn = true // Set info as logged in to true
        response.status(200).json(user)
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

router.get('/refresh', restricted, (request, response) => {
  const user = request.session.username
  console.log(user)

  Users.getMe(user)
    .then(user => {
      response.status(418).json(user)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: `There is no user currently logged in` })
    })
})

router.get('/logout', restricted, (request, response) => {
  request.session.destroy(() => {
    response.status(200).json({ message: 'You have been logged out' })
  })
})

//// Get list of users
router.get('/users', (request, response) => {
  const user = request.session.username
  console.log(user)

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