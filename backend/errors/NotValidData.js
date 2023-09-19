const { BAD_REQUEST } = require('../utils/constants');

class NotValidData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = NotValidData;
