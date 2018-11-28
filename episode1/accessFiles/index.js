const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const leaderBoardFile = './leaderBoard.json'

function compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || 
         !b.hasOwnProperty(key)) {
          return 0; 
      }
      
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
        
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? 
        (comparison * -1) : comparison
      );
    };
  }
// Yes I grabbed this from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/ sue me OH NO I GOOGLED IT FOR SPEED MY DEAR EDUCATION... -_-

calculateLeaderBoard = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(leaderBoardFile, (err, data) => {
            if (err) reject(err)
            data = JSON.parse(data)
            keys = Object.keys(data)
            let tempArray = []
            keys.forEach((e) => {
                tempArray.push(data[e])
            })
            tempArray.sort(compareValues('points', 'desc'))
            fs.writeFileSync('./leaderBoard.txt', 'War Games Episode 1 Leader Board:\n')
            tempArray.forEach((e) => {
                fs.appendFileSync('./leaderBoard.txt', (e.points === 1) ? `User ${e.username} has ${e.points} point\n` : `User ${e.username} has ${e.points} points\n`)
            })
            resolve(fs.readFileSync('./leaderBoard.txt'))
        })
    })
}

app.route('/leaderBoard')
.get((req, res, next) => {
    if (req.query.raw === 'true') {
        console.log('Got a raw /leaderBoard request')
        fs.readFile(leaderBoardFile, (err, data) => {
            data = JSON.parse(data)
            res.status(200).json(data)
        })
    } else {
        console.log('Got a /leaderBoard request')
        calculateLeaderBoard()
        .then((board) => {
            res.status(200).send(board)
        })
        .catch((err) => {
            res.status(500).send('Server side error')
            console.error(err)
        })
    }
})

app.route('/leaderBoard/:user')
.get((req, res, next) => {
    const user = req.params.user
    if (req.query.raw === 'true') {
        console.log(`Got a raw /leaderBoard/${user} request`)
        fs.readFile(leaderBoardFile, (err, data) => {
            data = JSON.parse(data)
            res.status(200).json(data[user])
        })
    } else {
        console.log(`Got a /leaderBoard/${user} request`)
        fs.readFile(leaderBoardFile, (err, data) => {
            data = JSON.parse(data)
            res.status(200).send((data[user].points === 1) ? `User ${data[user].username} has ${data[user].points} point` : `User ${data[user].username} has ${data[user].points} points`)
        })
    }
})

app.listen(8080, () => {
    console.log('Listening on port 8080!')
})
