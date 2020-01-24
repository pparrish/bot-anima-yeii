import saveValueInUser from './saveValueInUser'

module.exports = {
  saveValueInUser,
  deleteValueInUser: require('./deleteValueInUser'),
  helpResponse: require('./helpResponse'),
  sendIssue: require('./sendIssue'),
  t10: require('./t10'),
  t10WithAutodetect: require('./t10WithAutodetect'),
  t100: require('./t100'),
  t100WithAutodetect: require('./t100WithAutodetect')
}
