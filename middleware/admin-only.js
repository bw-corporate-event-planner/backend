module.exports = adminOnly

function adminOnly(request, response, next) {

  console.log(request.session)
  if (request.session.role_id === 1) {
    next()
  } else {
    response.status(401).json({ message: 'This user is not authorized to use this function' })
  }
}