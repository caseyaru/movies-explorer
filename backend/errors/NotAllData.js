const { AUTH_ERROR } = require('../utils/constants');

class NotAllData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
  }
}

module.exports = NotAllData;
