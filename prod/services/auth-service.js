"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = generateJWT;
exports.requireLogin = requireLogin;
exports.decodeToken = decodeToken;
exports.getUsername = getUsername;
exports.getUserId = getUserId;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function generateJWT(user) {
  var tokenData = {
    username: user.username,
    id: user._id,
    isAdmin: user.isAdmin,
    isHost: user.isHost,
    pin: user.pin
  };
  return _jsonwebtoken["default"].sign({
    user: tokenData
  }, 'somesecretinformationdude');
}

function requireLogin(req, res, next) {
  var token = decodeToken(req);

  if (!token) {
    return res.status(401).json({
      message: 'You must be logged in.'
    });
  }

  next();
}

function decodeToken(req) {
  var token = req.headers.authorization || req.header['authorization'];

  if (!token) {
    return null;
  }

  try {
    return _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

function getUsername(req) {
  var token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.username;
}

function getUserId(req) {
  var token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.id;
}