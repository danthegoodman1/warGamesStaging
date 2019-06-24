const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const exec = require('child_process').execSync
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./build'))

app.route('/hi')
.get((req, res, next) => {
    console.log('efie')
    res.send('hey')
})

app.listen(8080, () => {
    console.log('yup')
})
