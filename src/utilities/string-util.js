export class StringUtil {
  static isEmpty(string) {
    return !string || !string.trim()
  }
  static capitalize(word) {
    return word.charAt(0).toUpperCase()
  }
}
