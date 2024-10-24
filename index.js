const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
  response.json({ info: 'Bitwave API' })
})

app.get('/users/:id', db.getUserByDeviceId)
app.put('/users/:id', db.updateUserSawAd)
app.put('/users/:id/withdraw', db.withdrawSats)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
