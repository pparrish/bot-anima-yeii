//TODO: to utils
const isPrefixedWith = prefix =>
  text =>
    text.startsWith(prefix)
//TODO: to utils
const getNameOfPrefixedCommand = command => command.slice(1).split(' ')[0]
//TODO: to utils
const getNameOfNonPrefixedCommand = command => command.split(' ')[0]
//TODO: to utils
const getCommandName = (text, havePrefix = false) =>
  havePrefix ? getNameOfPrefixedCommand(text) : getNameOfNonPrefixedCommand(text)
//TODO: to utils
const getOptionsText = aCommand =>
  aCommand.split(' ')
    .filter((x, index) => index > 0)
    .join(' ')
// no se uriliza
const all = (toParse, name) => {
  return { name: name, value: toParse }
}
//TODO: this to utils
const matchsToArray = (pattern, text) => {
  let resultArray = []
  let match = null
  while ((match = pattern.exec(text)) !== null) { resultArray.push(match[0]) }
  return resultArray
}
// no se utiliza
const nums = (toParse, name) => {
  return { name: name,
    value: matchsToArray(/[+-]?\d+(?:\.\d+)?/g, toParse).map(x => Number(x)) }
}
// no se utiliza
const numsToSum = fn => (toParse, name) => {
  let { value } = fn(toParse, name)
  value = value.reduce((acc, act) => acc + act, 0)
  return {
    name,
    value
  }
}
//TODO: this to parsers nodule
const first = (toParse, aName, consume) => {
  let name = aName
  let value = toParse.split(' ')[0]
  let remainder = consume ? toParse.replace(value + ' ', '') : toParse
  return { name, value, remainder }
}
//TODO: this to parsers module
const rest = (toParse, aName, consume) => {
  let name = aName
  let value = toParse
  let remainder = consume ? '' : toParse
  return { name, value, remainder }
}

const sumAllNums = numsToSum(nums)

module.exports = { isPrefixedWith,
  getCommandName,
  getOptionsText,
  all,
  nums,
  sumAllNums,
  first,
  rest,
  matchsToArray,
  ...module.exports }
