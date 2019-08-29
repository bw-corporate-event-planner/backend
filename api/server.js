const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const knexConnection = require('../data/dbConfig.js')
const restricted = require('../middleware/restricted.js')

const UserRoutes = require('../user/user-router.js')
const RolesRoutes = require('../roles/roles-router.js')
const EventsRoutes = require('../events/events-router.js')
const VendorsRoutes = require('../vendors/vendors-router.js')
const ListsRoutes = require('../lists/lists-router.js')

const server = express();

const sessionOptions = {
  name: 'corporate-event',
  secret: process.env.COOKIE_SECRET || 'keep it secret, keep it safe!', /// for encryption
  cookie: {
    secure: process.env.COOKIE_SECURE || false, // Should be set to true during production, false for development
    maxAge: 1000 * 60 * 60 * 24 ,  // set in milliseconds (set to 1 day)
    httpOnly: true, // client JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({ 
    knex: knexConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

const corsOptions ={
  credentials: true,
}

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true)
  next();
});

server.use(helmet())
server.use(express.json())
server.use(cors(corsOptions))
server.use(session(sessionOptions))

server.use('/api', UserRoutes)
server.use('/api/roles', RolesRoutes)
server.use('/api/events',  EventsRoutes)
server.use('/api/vendors', VendorsRoutes)
server.use('/api/lists', ListsRoutes)

server.get('/', (request, response) => {
  response.json({ api: 'up', session: request.session })
})

module.exports = server