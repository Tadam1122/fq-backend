"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _routes = require("./routes");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import https from 'https'
const app = (0, _express.default)();
const PORT = process.env.PORT || '8000'; //ssh config for localhost
// const credentials = {
//   key: fs.readFileSync('../certs/localhost-key.pem', 'utf-8'),
//   cert: fs.readFileSync('../certs/localhost.pem', 'utf-8'),
// }

app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.static(_path.default.resolve(__dirname, '../dist'), {
  maxAge: '1y',
  etag: false
}));
(0, _routes.registerRoutes)(app);

const httpServer = _http.default.createServer(app); // const io = require('socket.io')(httpServer, {
//   cors: {
//     origin:
//       `${process.env.VUE_APP_HOST}:${process.env.PORT}` ||
//       'http://localhost:8080',
//     methods: ['GET', 'POST'],
//   },
// })


const io = require('socket.io')(httpServer);

let rooms = [];
io.sockets.on('connection', function (socket) {
  console.log('new connection');
  socket.on('newRoom', data => {
    //set id and points for user
    data.users[0].id = socket.id;
    data.users[0].points = 0; //set initial room count

    data.roomCnt = 1;
    data.answerCnt = 0; //join new room

    socket.join(data.pin);
    rooms.push(data);
    socket.emit('newRoomCreated');
  });
  socket.on('joinRoom', data => {
    let found = false;

    for (let room of rooms) {
      if (room.pin === data.pin) {
        found = true; //set values for user

        data.user.id = socket.id;
        data.user.points = 0; //join new group

        room.roomCnt++;
        room.users.push(data.user);
        socket.join(data.pin);
        socket.emit('roomFound', {
          pin: room.pin
        });
        break;
      }
    }

    if (!found) {
      socket.emit('roomNotFound');
    }
  });
  socket.on('getUsernames', data => {
    let foundPin;
    let usernames = [];

    for (let room of rooms) {
      if (room.pin === data.pin) {
        socket.join(data.pin);
        foundPin = data.pin;

        for (let user of room.users) {
          usernames.push(user.username);
        }
      }
    }

    io.sockets.to(foundPin).emit('setUsers', {
      usernames: usernames
    });
  });
  socket.on('getQuestion', data => {
    let foundRoom = null;

    for (let room of rooms) {
      if (room.pin == data.pin) {
        room.questionNo++;
        foundRoom = room;
        break;
      }
    }

    if (foundRoom.quiz.quizQA.length > 0) {
      let question = foundRoom.quiz.quizQA.pop();
      io.sockets.to(foundRoom.pin).emit('nextQuestion', {
        users: foundRoom.users,
        question: question,
        quizLength: foundRoom.quizLength,
        questionNo: foundRoom.questionNo
      });
    } //no more quiz question, game is over
    else {
        io.sockets.to(foundRoom.pin).emit('endGame', {
          users: foundRoom.users
        });
      }
  });
  socket.on('submitAnswer', data => {
    for (let room of rooms) {
      if (room.pin === data.pin) {
        for (let user of room.users) {
          if (user.id === socket.id) {
            user.answer = data.answer; //notify host that player submitted answer

            io.sockets.to(room.pin).emit('answerEntered', {
              username: user.username
            });
            room.answerCnt++; //everyone except for host submitted answers

            if (room.answerCnt === room.roomCnt - 1) {
              room.answerCnt = 0;
              io.sockets.to(room.pin).emit('playersReady', {
                question: data.question
              });
            }
          }
        }
      }
    }
  });
  socket.on('getAnswers', data => {
    for (let room of rooms) {
      if (room.pin == data.pin) {
        socket.emit('recvAnswers', {
          users: room.users
        });
      }
    }
  });
  socket.on('timeWarning', data => {
    io.sockets.to(data.pin).emit('setTimer');
  });
  socket.on('getHost', data => {
    for (let room of rooms) {
      if (room.pin == data.pin) {
        for (let user of room.users) {
          if (user.host) {
            socket.emit('sendHost', {
              user: user.username
            });
          }
        }
      }
    }
  });
  socket.on('submitPoints', data => {
    let foundRoom;

    for (let room of rooms) {
      if (room.pin == data.pin) {
        foundRoom = room;

        for (let user of room.users) {
          for (let duser of data.users) {
            if (duser.username == user.username) {
              user.points += Number.parseFloat(duser.newPoints);
              user.newPoints = Number.parseFloat(duser.newPoints);
              break;
            }
          }
        }
      }
    }

    io.sockets.to(data.pin).emit('getPoints', {
      users: foundRoom.users
    });
  });
  socket.on('disconnect', () => {
    let usernames = [];
    let found = false;
    console.log('user disconnected');

    for (let j = 0; j < rooms.length; j++) {
      //search each room for user
      for (let i = 0; i < rooms[j].users.length; i++) {
        //remove disconnected user from room
        if (rooms[j].users[i].id === socket.id) {
          found = true;
          console.log(`user ${rooms[j].users[i].username} removed from room`);
          rooms[j].users.splice(i, 1); //update current users
        } else {
          usernames.push(rooms[j].users[i].username);
        }
      } //reset usernames and search again


      if (!found) {
        usernames = [];
      } //disconnected user already found, push updated usernames
      else {
          io.sockets.to(rooms[j].pin).emit('setUsers', {
            usernames: usernames
          });
          break;
        }
    }
  });
});
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '../dist/index.html'));
});
httpServer.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});