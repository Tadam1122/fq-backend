"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _authService = require("../../services/auth-service");

async function index(req, res) {
  const userData = req.body;
  const token = (0, _authService.generateJWT)(userData);
  return res.status(200).json({
    token: token
  });
}