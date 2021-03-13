var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

// All distributions files are served under the fact folder "media"
// app.use('/media', express.static(`${__dirname}/../../dist`))

app.use(express.static(`${__dirname}/../../dist`))

// Serves HTML file on launch
app.get('/', function (req, res) {
    res.sendFile('/dist/index.html', { root: __dirname + '/../..' })
})

// Designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
