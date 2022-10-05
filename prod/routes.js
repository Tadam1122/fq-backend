"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _quizRoutes = _interopRequireDefault(require("./api/quiz/quiz-routes"));

var _registerRoutes = _interopRequireDefault(require("./api/register/register-routes"));

var _userRoutes = _interopRequireDefault(require("./api/user/user-routes"));

var _authRoutes = _interopRequireDefault(require("./api/auth/auth-routes"));

var _adminRoutes = _interopRequireDefault(require("./api/admin/admin-routes"));

var _gameRoutes = _interopRequireDefault(require("./api/game/game-routes"));

function registerRoutes(app) {
  app.use('/api', _quizRoutes["default"]);
  app.use('/api', _registerRoutes["default"]);
  app.use('/api', _userRoutes["default"]);
  app.use('/api', _authRoutes["default"]);
  app.use('/api', _adminRoutes["default"]);
  app.use('/api', _gameRoutes["default"]);
}