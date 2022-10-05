"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ObjectId = _require.ObjectId;

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); //list all quizzes

app.get('/api/quiz', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var client, db, quizzes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return MongoClient.connect('mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 2:
            client = _context.sent;
            db = client.db('pub-quiz');
            _context.next = 6;
            return db.collection('quizzes').find({}).toArray();

          case 6:
            quizzes = _context.sent;
            res.status(200).json(quizzes);
            client.close();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //get single quiz by id

app.get('/api/:quizId/quiz', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var quizId, client, db, quiz;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            quizId = req.params.quizId;
            _context2.next = 3;
            return MongoClient.connect('mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context2.sent;
            db = client.db('pub-quiz');
            _context2.next = 7;
            return db.collection('quizzes').findOne({
              _id: ObjectId(quizId)
            });

          case 7:
            quiz = _context2.sent;

            if (quiz) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(404).json('Quiz could not be found'));

          case 12:
            res.status(200).json(quiz);

          case 13:
            client.close();

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //create quiz

app.post('/api/quiz', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var quiz, client, db;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            quiz = req.body;
            _context3.next = 3;
            return MongoClient.connect('mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context3.sent;
            db = client.db('pub-quiz');
            _context3.next = 7;
            return db.collection('quizzes').insertOne(quiz);

          case 7:
            res.status(200).json(quiz);
            client.close();

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //update quiz

app.put('/api/quiz', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var quiz, client, db, quizId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            quiz = req.body;
            _context4.next = 3;
            return MongoClient.connect('mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context4.sent;
            db = client.db('pub-quiz');
            _context4.next = 7;
            return db.collection('quizzes').findOne({
              topic: quiz.topic
            });

          case 7:
            quizId = _context4.sent;
            _context4.next = 10;
            return db.collection('quizzes').updateOne({
              _id: ObjectId(quizId._id)
            }, {
              $set: quiz
            });

          case 10:
            res.status(200).json(quiz);
            client.close();

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //remove quiz

app["delete"]('/api/:quizId/quiz', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var quizId, client, db;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            quizId = req.params.quizId;
            console.log(quizId);
            _context5.next = 4;
            return MongoClient.connect('mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 4:
            client = _context5.sent;
            db = client.db('pub-quiz');
            _context5.next = 8;
            return db.collection('quizzes').deleteOne({
              _id: ObjectId(quizId)
            });

          case 8:
            res.status(200).json('Quiz successfully deleted');
            client.close();

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //get all users

app.get('/api/user', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var client, db, users;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return MongoClient.connect('mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 2:
            client = _context6.sent;
            db = client.db('pub-quiz');
            _context6.next = 6;
            return db.collection('users').find({}).toArray();

          case 6:
            users = _context6.sent;
            res.status(204);
            client.close();

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); //find a user given an id

app.get('/api/:userId/user/', /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var userId, client, db, user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            userId = req.params.userId;
            _context7.next = 3;
            return MongoClient.connect('mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context7.sent;
            db = client.db('pub-quiz');
            _context7.next = 7;
            return db.collection('users').findOne({
              _id: ObjectId(userId)
            });

          case 7:
            user = _context7.sent;

            if (user) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", res.status(404).json('User could not be found'));

          case 12:
            res.status(200).json(user);

          case 13:
            client.close();

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
app.listen('8000', function () {
  console.log('app listening on port 8000');
});