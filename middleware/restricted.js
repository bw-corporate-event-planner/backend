const bcrypt = require('bcryptjs')

const Users = require('../user/user-model.js')

module.exports = restricted

function restricted(request, response, next) {
  console.log('request.session in restricted', request.session)
  if (request.session && request.session.username) {
    next();
  } else {
    response.status(401).json({ message: 'No unauthorized access to this part of site' })
  }
}