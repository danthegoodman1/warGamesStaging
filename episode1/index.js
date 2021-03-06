const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const exec = require('child_process').execSync
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.route('/')
.get((req, res, next) => {
    res.send("I'm alive!")
})

app.route('/cat')
.post((req, res, next) => {
    console.log('post')
    const path = req.body.path
    const readFile = exec(`cat ./accessFiles/${path}`)
    res.send(readFile)
})

app.route('/:path')
.get((req, res, next) => {
    console.log('get')
    const path = req.params.path
    const readFile = exec(`cat ./accessFiles/${path}`)
    res.send(readFile)
})

app.listen(8080, () => {
    console.log('yup')
})
