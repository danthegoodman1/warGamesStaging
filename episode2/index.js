const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const exec = require('child_process').execSync
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./build'))

let data = [{name: 'test1', uid: 'test1', quant: 4, item: 'wjho carew'}]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.route('/hi')
.get((req, res, next) => {
    console.log('efie')
    res.send('hey')
})

app.route('/getItems')
.get((req, res, next) => {
    res.json({data})
})

app.route('/addItem')
.post((req, res, next) => {
    data.push({name: req.body.name, quant: req.body.quant, item: req.body.quant})
    res.send('ok')
})

app.listen(8080, () => {
    console.log('yup')
})
