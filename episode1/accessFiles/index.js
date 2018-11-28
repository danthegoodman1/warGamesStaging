const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const request = require('request-promise')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Leader Board API

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
            fs.writeFileSync('./leaderBoard', 'War Games Episode 1 Leader Board:\n')
            tempArray.forEach((e) => {
                fs.appendFileSync('./leaderBoard', (e.points === 1) ? `User ${e.username} has ${e.points} point\n` : `User ${e.username} has ${e.points} points\n`)
            })
            resolve(fs.readFileSync('./leaderBoard'))
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

// Point Calculating Code

const fileArray = [{fileName: 'bwfig.txt', fileValue: 'sykmmnoxugszfnlgopkl'}, {fileName: 'dqhic.txt', fileValue: 'xfwydxdwjkzdwmjqkpud'}, {fileName: 'dvhzo.txt', fileValue: 'esgzojlqdifbvbwlrscs'}, {fileName: 'fhlpk.txt', fileValue: 'iypxemtdglaaewaofchk'}, {fileName: 'ghlra.txt', fileValue: 'akghdomkleebcbtuouov'}, {fileName: 'gqbnm.txt', fileValue: 'qgfvftzsscbhwbxehxgq'}, {fileName: 'gvjtb.txt', fileValue: 'zmdyswczahjrudqxjywj'}, {fileName: 'gvrah.txt', fileValue: 'edbdyyykmrvporbztfdw'}, {fileName: 'ijchn.txt', fileValue: 'kaatseyiygzhdkcuqljx'}, {fileName: 'ktgsx.txt', fileValue: 'dcogqcqiqnlbtdppzctr'}, {fileName: 'nnddw.txt', fileValue: 'rrmobualejyiyjegqhch'}, {fileName: 'uodsu.txt', fileValue: 'cryjkzeihfsajxclyxgp'}, {fileName: 'xtixa.txt', fileValue: 'edxcjoqfmnugmgofrapq'}, {fileName: 'ybmvq.txt', fileValue: 'qusxfdxgtrchrcchumap'}, {fileName: 'zovdh.txt', fileValue: 'vemzmtprtmxvwzrgtqyg'}]

checkGET = (ip) => {
    return new Promise((resolve, reject) => {
        const randomNum = Math.floor(Math.random() * 15)
        const fileName = fileArray[randomNum].fileName
        let options = {
            uri: `http://${ip}/${fileName}`
        }
        request(options)
        .then((res) => {
            if (res === fileArray[randomNum].fileValue){
                resolve(true)
            } else {
                resolve(false)
            }
        })
        .catch((err) => {
            reject(err)
        })
    })
}

checkPOST = (ip) => {
    return new Promise((resolve, reject) => {
        const randomNum = Math.floor(Math.random() * 15)
        const fileName = fileArray[randomNum].fileName
        let options = {
            uri: `http://${ip}/cat`,
            method: 'POST',
            body: {
                path: fileName
            }
        }
        request(options)
        .then((res) => {
            if (res === fileArray[randomNum].fileValue){
                resolve(true)
            } else {
                resolve(false)
            }
        })
        .catch((err) => {
            reject(err)
        })
    })
}

setInterval(() => {
    let tempLeaderBoard = JSON.parse(fs.readFileSync(leaderBoardFile))
    const keys = Object.keys(tempLeaderBoard)
    keys.forEach((e) => {
        checkGET(tempLeaderBoard[e].ip)
        .then((givePoints) => {
            if (givePoints) {
                tempLeaderBoard[e].points += 1
            }
            return checkPOST(tempLeaderBoard[e].ip)
        })
        .then((givePoints) => {
            if (givePoints) {
                tempLeaderBoard[e].points += 1
            }
        })
        .catch((err) => {
            console.error(err)
        })
    })
    fs.writeFileSync(leaderBoardFile, tempLeaderBoard)
}, 60000) // Every minute check for points

app.listen(8080, () => {
    console.log('Listening on port 8080!')
})
