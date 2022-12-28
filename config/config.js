const axios = require('axios')
const URI = 'https://trouv-api.onrender.com/trouv'

const userRoute = `${URI}/users`
const objectRoute = `${URI}/objects`

const session = true

export { axios, userRoute, objectRoute, session }
