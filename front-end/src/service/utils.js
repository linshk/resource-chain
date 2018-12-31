module.exports = {
  dateToString: (date) => {
    let str = date.toISOString()
    return str.slice(0, 10) + ' ' + str.slice(11, 19)
  }
}
