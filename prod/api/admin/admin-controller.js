"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = show;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

//read single admin
function show(_x, _x2) {
  return _show.apply(this, arguments);
}

function _show() {
  _show = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, client, db, admin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.params.id;
            _context.next = 3;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 3:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context.next = 7;
            return db.collection('admins').findOne({
              userId: userId
            });

          case 7:
            admin = _context.sent;
            console.log(userId);
            client.close();

            if (admin) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(404).json('admin could not be found'));

          case 14:
            return _context.abrupt("return", res.status(200).json(admin));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _show.apply(this, arguments);
}