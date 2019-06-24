const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const exec = require('child_process').execSync
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./build'))

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
    console.log('sending db items')
    res.json({items: [{name: 'test1', uid: 'test1'}, {name: 'test2', uid: 'test2'}]})
})

app.listen(8080, () => {
    console.log('yup')
})
