const { FORBIDDEN } = require('../utils/constants');

class NotAllowed extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = NotAllowed;
