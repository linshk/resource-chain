module.exports = (exp, message, status = 400) => {
  if (!exp) {
    const err = new Error(message);
    err.status = status;
    throw err;
  }
};