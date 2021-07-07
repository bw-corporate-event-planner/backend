module.exports = checkAccess.js

//// Check to see if user is admin or manager for create/delete

function checkAccess(request, response, next) {
  console.log(request.session)
  if (request.session.role_id === 1 || request.session.role_id === 2) {
    next()
  } else {
    response.status(401).json({ message: 'This user is not authorized to use this function' })
  }
}