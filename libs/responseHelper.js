class Responses {
  constructor() {
    return this;
  }
  success(statusCode, data, message, meta) {
    return {
      error: false,
      statusCode,
      data,
      message,
      meta,
    };
  }
  error(errorCode, message) {
    return {
      error: true,
      errorCode,
      message,
    };
  }
  loginSuccess(statusCode, token, message) {
    return {
      error: false,
      statusCode,
      token,
      message,
    };
  }

  signUpSuccess(statusCode, token, message) {
    return {
      error: false,
      statusCode,
      token,
      message,
    };
  }

  output(errorCode, data, count = 0) {
    return {
      count,
      data,
      error: false,
      errorCode,
    };
  }
}
const responses = new Responses();
module.exports = responses;
