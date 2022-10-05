"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.index = index;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

//create quiz
function create(_x, _x2) {
  return _create.apply(this, arguments);
} //list quizzes


function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var quiz, client, db;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            quiz = req.body;
            _context.next = 3;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context.next = 7;
            return db.collection('quizzes').insertOne(quiz);

          case 7:
            client.close();
            return _context.abrupt("return", res.status(200).json(quiz));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

function index(_x3, _x4) {
  return _index.apply(this, arguments);
} //update quiz


function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var client, db, quizzes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 2:
            client = _context2.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context2.next = 6;
            return db.collection('quizzes').find({}).toArray();

          case 6:
            quizzes = _context2.sent;
            client.close();
            return _context2.abrupt("return", res.status(200).json(quizzes));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _index.apply(this, arguments);
}

function update(_x5, _x6) {
  return _update.apply(this, arguments);
} //remove quiz


function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var quiz, client, db, quizId;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            quiz = req.body;
            _context3.next = 3;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context3.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context3.next = 7;
            return db.collection('quizzes').findOne({
              topic: quiz.topic
            });

          case 7:
            quizId = _context3.sent;
            _context3.next = 10;
            return db.collection('quizzes').updateOne({
              _id: (0, _mongodb.ObjectId)(quizId._id)
            }, {
              $set: quiz
            });

          case 10:
            client.close();
            return _context3.abrupt("return", res.status(200).json(quiz));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _update.apply(this, arguments);
}

function remove(_x7, _x8) {
  return _remove.apply(this, arguments);
} //read single quiz


function _remove() {
  _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var quizId, client, db;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            quizId = req.params.id;
            _context4.next = 3;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context4.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context4.next = 7;
            return db.collection('quizzes').deleteOne({
              _id: (0, _mongodb.ObjectId)(quizId)
            });

          case 7:
            client.close();
            return _context4.abrupt("return", res.status(200).json('Quiz successfully deleted'));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _remove.apply(this, arguments);
}

function show(_x9, _x10) {
  return _show.apply(this, arguments);
}

function _show() {
  _show = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var quizId, client, db, quiz;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            quizId = req.params.id;
            console.log(quizId);
            console.log(req.params);
            _context5.next = 5;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 5:
            client = _context5.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context5.next = 9;
            return db.collection('quizzes').findOne({
              _id: (0, _mongodb.ObjectId)(quizId)
            });

          case 9:
            quiz = _context5.sent;
            client.close();

            if (quiz) {
              _context5.next = 15;
              break;
            }

            return _context5.abrupt("return", res.status(404).json('Quiz could not be found'));

          case 15:
            return _context5.abrupt("return", res.status(200).json(quiz));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _show.apply(this, arguments);
}