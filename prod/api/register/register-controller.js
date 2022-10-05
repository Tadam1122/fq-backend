"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _stringUtil = require("../../utilities/string-util");

var _mongodb = require("mongodb");

var _argon = _interopRequireDefault(require("argon2"));

//create user
function create(_x, _x2) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var validation, user, client, db, userCheck;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validation = validateIndex(req.body);

            if (validation.isValid) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: validation.message
            }));

          case 3:
            _context.t0 = req.body.username.toLowerCase();
            _context.next = 6;
            return _argon["default"].hash(req.body.password);

          case 6:
            _context.t1 = _context.sent;
            user = {
              username: _context.t0,
              password: _context.t1,
              isAdmin: false
            };
            _context.next = 10;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 10:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz'); //check username to make sure its not already taken

            _context.next = 14;
            return db.collection('users').findOne({
              username: req.body.username.toLowerCase()
            });

          case 14:
            userCheck = _context.sent;

            if (!userCheck) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: "Username '".concat(req.body.username, "' already taken")
            }));

          case 17:
            _context.next = 19;
            return db.collection('users').insertOne(user);

          case 19:
            client.close();
            return _context.abrupt("return", res.status(200).json(user));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

function validateIndex(body) {
  var errors = '';

  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors += 'Username required. ';
  }

  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors += 'Password required. ';
  }

  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}