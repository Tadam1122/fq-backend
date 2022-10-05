"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _routes = require("./routes");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || '8000'; //ssh config for localhost
// const credentials = {
//   key: fs.readFileSync('../certs/localhost-key.pem', 'utf-8'),
//   cert: fs.readFileSync('../certs/localhost.pem', 'utf-8'),
// }

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '../dist'), {
  maxAge: '1y',
  etag: false
}));
(0, _routes.registerRoutes)(app);

var httpServer = _http["default"].createServer(app); // const io = require('socket.io')(httpServer, {
//   cors: {
//     origin:
//       `${process.env.VUE_APP_HOST}:${process.env.PORT}` ||
//       'http://localhost:8080',
//     methods: ['GET', 'POST'],
//   },
// })


var io = require('socket.io')(httpServer);

var rooms = [];
io.sockets.on('connection', function (socket) {
  console.log('new connection');
  socket.on('newRoom', function (data) {
    //set id and points for user
    data.users[0].id = socket.id;
    data.users[0].points = 0; //set initial room count

    data.roomCnt = 1;
    data.answerCnt = 0; //join new room

    socket.join(data.pin);
    rooms.push(data);
    socket.emit('newRoomCreated');
  });
  socket.on('joinRoom', function (data) {
    var found = false;

    var _iterator = _createForOfIteratorHelper(rooms),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var room = _step.value;

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
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!found) {
      socket.emit('roomNotFound');
    }
  });
  socket.on('getUsernames', function (data) {
    var foundPin;
    var usernames = [];

    var _iterator2 = _createForOfIteratorHelper(rooms),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var room = _step2.value;

        if (room.pin === data.pin) {
          socket.join(data.pin);
          foundPin = data.pin;

          var _iterator3 = _createForOfIteratorHelper(room.users),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var user = _step3.value;
              usernames.push(user.username);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    io.sockets.to(foundPin).emit('setUsers', {
      usernames: usernames
    });
  });
  socket.on('getQuestion', function (data) {
    var foundRoom = null;

    var _iterator4 = _createForOfIteratorHelper(rooms),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var room = _step4.value;

        if (room.pin == data.pin) {
          room.questionNo++;
          foundRoom = room;
          break;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    if (foundRoom.quiz.quizQA.length > 0) {
      var question = foundRoom.quiz.quizQA.pop();
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
  socket.on('submitAnswer', function (data) {
    var _iterator5 = _createForOfIteratorHelper(rooms),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var room = _step5.value;

        if (room.pin === data.pin) {
          var _iterator6 = _createForOfIteratorHelper(room.users),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var user = _step6.value;

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
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  });
  socket.on('getAnswers', function (data) {
    var _iterator7 = _createForOfIteratorHelper(rooms),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var room = _step7.value;

        if (room.pin == data.pin) {
          socket.emit('recvAnswers', {
            users: room.users
          });
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  });
  socket.on('timeWarning', function (data) {
    io.sockets.to(data.pin).emit('setTimer');
  });
  socket.on('getHost', function (data) {
    var _iterator8 = _createForOfIteratorHelper(rooms),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var room = _step8.value;

        if (room.pin == data.pin) {
          var _iterator9 = _createForOfIteratorHelper(room.users),
              _step9;

          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var user = _step9.value;

              if (user.host) {
                socket.emit('sendHost', {
                  user: user.username
                });
              }
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  });
  socket.on('submitPoints', function (data) {
    var foundRoom;

    var _iterator10 = _createForOfIteratorHelper(rooms),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var room = _step10.value;

        if (room.pin == data.pin) {
          foundRoom = room;

          var _iterator11 = _createForOfIteratorHelper(room.users),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var user = _step11.value;

              var _iterator12 = _createForOfIteratorHelper(data.users),
                  _step12;

              try {
                for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                  var duser = _step12.value;

                  if (duser.username == user.username) {
                    user.points += Number.parseFloat(duser.newPoints);
                    user.newPoints = Number.parseFloat(duser.newPoints);
                    break;
                  }
                }
              } catch (err) {
                _iterator12.e(err);
              } finally {
                _iterator12.f();
              }
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    io.sockets.to(data.pin).emit('getPoints', {
      users: foundRoom.users
    });
  });
  socket.on('disconnect', function () {
    var usernames = [];
    var found = false;
    console.log('user disconnected');

    for (var j = 0; j < rooms.length; j++) {
      //search each room for user
      for (var i = 0; i < rooms[j].users.length; i++) {
        //remove disconnected user from room
        if (rooms[j].users[i].id === socket.id) {
          found = true;
          console.log("user ".concat(rooms[j].users[i].username, " removed from room"));
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
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../dist/index.html'));
});
httpServer.listen(PORT, function () {
  console.log("app listening on port ".concat(PORT));
});