const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const request = require('request-promise')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const rateLimit = require("express-rate-limit")
const Sequelize = require('sequelize')
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: './database.sqlite'
})

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.')
})
.catch(err => {
    console.error('Unable to connect to the database:', err)
})

const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    allPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    episodePoints: {
        type: Sequelize.JSON,
        defaultValue: {}
    },
    episodeInfo: {
        type: Sequelize.JSON,
        defaultValue: {}
    }
})

User.sync()
.then(() => {
    // return User.create({
    //     firstName: 'example2',
    //     lastName: 'example2',
    //     userName: 'example2',
    //     allPoints: 40,
    //     episodeInfo: {
    //         episode1: {
    //             pi: '0.0.0.0'
    //         }
    //     },
    //     episodePoints: {
    //         episode1: 40
    //     }
    // })
    // return User.findOrCreate({
    //     where: {username: 'example'},
    //     defaults: {
    //         userName: 'example',
    //         firstName: 'example',
    //         lastName: 'example',
    //         episodePoints: {
    //             episode1: 0
    //         },
    //         allPoints: 0
    //     }
    // })
    return User.findAll()
})
// .spread((user, created) => {
//     console.log(created)
// })
.then(users => {
    console.log(`\n\n${users.length} users in db\n\n`)
})
.catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
        console.log('hey\n\n\n\n\nhey')
        // This is how we handle sequelize errors
    }
    console.error(err)
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Front end
app.use(express.static('dist'))

// Rate limiter

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests! Try again in 120 seconds"
})
 
//  apply to all requests
app.use(limiter)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
        // fs.readFile(leaderBoardFile, (err, data) => {
        //     if (err) reject(err)
        //     data = JSON.parse(data)
        //     keys = Object.keys(data)
        //     let tempArray = []
        //     keys.forEach((e) => {
        //         tempArray.push(data[e])
        //     })
        //     tempArray.sort(compareValues('points', 'desc'))
        //     fs.writeFileSync('./leaderBoard', 'War Games Episode 1 Leader Board:\n')
        //     tempArray.forEach((e) => {
        //         fs.appendFileSync('./leaderBoard', (e.points === 1) ? `User ${e.username} has ${e.points} point\n` : `User ${e.username} has ${e.points} points\n`)
        //     })
        //     resolve(fs.readFileSync('./leaderBoard'))
        // })
        User.findAll()
        .then((users) => {
            let tempArray = []
            users.forEach((e) => {
                tempArray.push({
                    firstName: e.firstName,
                    lastName: e.lastName,
                    userName: e.userName,
                    allPoints: e.allPoints
                })
            })
            tempArray.sort(compareValues('allPoints', 'desc'))
            resolve(tempArray)
        })
    })
}

// API Routes

app.route('/api/test')
.get((req, res, next) => {
    console.log('got request')
    res.send('got requests')
})

app.route('/api/leaderBoard')
.get((req, res, next) => {
    if (req.query.raw === 'true') {
        console.log('Got a raw /leaderBoard request')
        // fs.readFile(leaderBoardFile, (err, data) => {
        //     data = JSON.parse(data)
        //     res.status(200).json(data)
        // })
        User.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
    } else {
        console.log('Got a /leaderBoard request')
        // calculateLeaderBoard()
        // .then((board) => {
        User.findAll()
        .then((board) => {
            let tempString = ''
            board.forEach((user) => {
                tempString = tempString.concat('', `User Name: ${user.userName}
First Name: ${user.firstName}
Last Name: ${user.lastName}
Total Points: ${user.allPoints}
Episode Specific Points: ${JSON.stringify(user.episodePoints)}\n\n`
                )
            })
            tempString = tempString.slice(0, -2)
            res.status(200).send(tempString)
        })
        .catch((err) => {
            res.status(500).send('Server side error')
            console.error(err)
        })
    }
})

app.route('/api/leaderBoard/:user')
.get((req, res, next) => {
    const user = req.params.user
    if (req.query.raw === 'true') {
        // console.log(`Got a raw /leaderBoard/${user} request`)
        // fs.readFile(leaderBoardFile, (err, data) => {
        //     data = JSON.parse(data)
        //     res.status(200).json(data[user])
        // })
        User.findOne({
            where: {
                userName: user
            }
        })
        .then((user) => {
            if (user) {
                res.status(200).send(user)
            } else {
                res.status(400).send('User does not exist')
            }
        })
    } else {
        console.log(`Got a /leaderBoard/${user} request`)
        // fs.readFile(leaderBoardFile, (err, data) => {
        //     data = JSON.parse(data)
        //     res.status(200).send((data[user].points === 1) ? `User ${data[user].username} has ${data[user].points} point` : `User ${data[user].username} has ${data[user].points} points`)
        // })
        User.findOne({
            where: {
                userName: user
            }
        })
        .then((user) => {
            if (user) {
                res.status(200).send(
`User Name: ${user.userName}
First Name: ${user.firstName}
Last Name: ${user.lastName}
Total Points: ${user.allPoints}
Episode Specific Points: ${JSON.stringify(user.episodePoints)}`
                )
            } else {
                res.status(400).send('User does not exist')
            }
        })
    }
})

app.route('/api/register')
.post((req, res, next) => {
    res.status(400).send('Not ready yet!')
})

////////////////////
// Begin Episode 1 point calculation
////////////////////

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
            if (res === fileArray[randomNum].fileValue){ // Could honestly just resolve this comparison
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
        console.log('spot1')
        const randomNum = Math.floor(Math.random() * 15)
        const fileName = fileArray[randomNum].fileName
        let options = {
            uri: `http://${ip}/cat`,
            method: 'POST',
            body: {
                "path": fileName
            },
            json: true
        }
        request(options)
        .then((res) => {
            console.log('pos2')
            if (res === fileArray[randomNum].fileValue){ // Could honestly just resolve this comparison
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
    console.log('Checking points')
    // let tempLeaderBoard = JSON.parse(fs.readFileSync(leaderBoardFile, 'utf-8'))
    // console.log(tempLeaderBoard)
    // const keys = Object.keys(tempLeaderBoard)
    // keys.forEach((e) => {
    //     checkGET(tempLeaderBoard[e].ip)
    //     .then((givePoints) => {
    //         if (givePoints) {
    //             tempLeaderBoard[e].points += 1
    //             console.log(tempLeaderBoard[e].points)
    //             console.log('giving points')
    //         }
    //         return checkPOST(tempLeaderBoard[e].ip)
    //     })
    //     .then((givePoints) => {
    //         if (givePoints) {
    //             tempLeaderBoard[e].points += 1
    //             console.log(tempLeaderBoard[e].points)
    //             console.log('giving mpre points')
    //         }
    //         console.log('writing')
    //         fs.writeFileSync(leaderBoardFile, JSON.stringify(tempLeaderBoard))
    //     })
    //     .catch((err) => {
    //         console.error(err)
    //     })
    // })
    User.findAll()
    .then((users) => {
        // TODO: Write this
    })
}, 60000) // Every minute check for points


////////////////////
// End Episode 1 point calculation
////////////////////

// API Listen

app.listen(8080, () => {
    console.log('Listening on port 8080!')
})
