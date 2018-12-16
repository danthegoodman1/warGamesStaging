const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.route('/cat')
.post((req, res, next) => {
    console.log('post')
    const path = req.body.path
    const readFile = fs.readFileSync(`./${path}`)
    res.send(readFile)
})

app.route('/:path')
.get((req, res, next) => {
    console.log('get')
    const path = req.params.path
    const readFile = fs.readFileSync(`./${path}`)
    res.send(readFile)
})

app.listen(8082, () => {
    console.log('yup')
})
