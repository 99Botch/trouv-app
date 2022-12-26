const axios = require('axios')
const URI = 'http://localhost:5000/trouv'

const userRoute = `${URI}/users`
const objectRoute = `${URI}/objects`

const session = true

export { axios, userRoute, objectRoute, session }
