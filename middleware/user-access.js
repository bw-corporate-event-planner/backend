module.exports = userAccess

function userAccess(request, response, next) {
  console.log(request.session)
  const userID = request.session.userid

  /// check to see where url is coming from (events, lists)
  // if EVENT, get param.id, and check against event/user table
  // if LIST, get list.event_id, and check against event/user table
}