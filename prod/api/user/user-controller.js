"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

function index(_x, _x2) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var client, db, users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 2:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context.next = 6;
            return db.collection('users').find({}).toArray();

          case 6:
            users = _context.sent;
            client.close();
            return _context.abrupt("return", res.status(204).json(users));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _index.apply(this, arguments);
}