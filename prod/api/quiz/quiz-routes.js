"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var controller = _interopRequireWildcard(require("./quizzes-controller"));

var router = _express["default"].Router();

//create quiz
router.post('/quiz', controller.create); //get all quizzes

router.get('/quiz', controller.index); //get single quiz by id

router.get('/quiz/:id', controller.show); //update quiz

router.put('/quiz', controller.update); //remove quiz

router["delete"]('/quiz/:id', controller.remove);
var _default = router;
exports["default"] = _default;