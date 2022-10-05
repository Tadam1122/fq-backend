"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringUtil = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var StringUtil = /*#__PURE__*/function () {
  function StringUtil() {
    (0, _classCallCheck2["default"])(this, StringUtil);
  }

  (0, _createClass2["default"])(StringUtil, null, [{
    key: "isEmpty",
    value: function isEmpty(string) {
      return !string || !string.trim();
    }
  }, {
    key: "capitalize",
    value: function capitalize(word) {
      return word.charAt(0).toUpperCase();
    }
  }]);
  return StringUtil;
}();

exports.StringUtil = StringUtil;