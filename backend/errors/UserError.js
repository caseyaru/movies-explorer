const { DUPLICATE } = require('../utils/constants');

class UserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE;
  }
}

module.exports = UserError;
