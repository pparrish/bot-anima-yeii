const utils = require('./utils')
const { setDice, d10, d100 } = require('./dices')

const rollD100 = setDice(d100)
const rollD10 = setDice(d10)

function handleOpen (openRequeriment) {
  let rollHistory = []
  let requerimientoAbierta = (openRequeriment > 100)
    ? () => 101
    : utils.stopOn(100, utils.addAlways(openRequeriment, 1))
  let result = 0
  do {
    result = rollD100()
    rollHistory.push(result)
  }
  while (result >= requerimientoAbierta())
  return () => rollHistory
}

/** Handle a blunder of result in a roller
 * @param {function} roller - A function return a array of numbers
 * @param {number} required - A maximun required value for blunder
 * @returns {array} - the result of a roller or the first value and a negative
 */
function handleBlunder (roller, required) {
  let result = roller()
  result = (result[0] > required)
    ? result
    : [ result[0], -rollD100() ]
  return result
}

// TODO: handle open requriment
// TODO: handle blunder requeriment
function habilityRoll ({
  mastery = false,
  goodLuck = false,
  badLuck = false,
  unableToMistake = false,
  blunder = true,
  blunderRequeriment = 3,
  open = true,
  openRequeriment = 90
} = {}) {
  if (mastery) {
    blunderRequeriment--
  }
  if (goodLuck) {
    blunderRequeriment--
  }
  if (badLuck) {
    blunderRequeriment = blunderRequeriment + 2
  }
  if (unableToMistake) {
    blunderRequeriment = 0
  }
  return handleBlunder(
    handleOpen(open ? openRequeriment : 101),
    blunder ? blunderRequeriment : 0
  )
}

// TODO Handle open requeriment
// TODO:handle blunder requeriment
function characteristicRoll () {
  let result = rollD10()
  return (result === 1)
    ? -3
    : (result === 10)
      ? 12
      : result
}

module.exports = {
  characteristicRoll,
  habilityRoll,
  rollD10,
  rollD100
}
