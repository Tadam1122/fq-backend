"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringUtil = void 0;

class StringUtil {
  static isEmpty(string) {
    return !string || !string.trim();
  }

  static capitalize(word) {
    return word.charAt(0).toUpperCase();
  }

}

exports.StringUtil = StringUtil;