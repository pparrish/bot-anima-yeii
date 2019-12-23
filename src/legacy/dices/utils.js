// this is  useles ??? deprecated
const isBlunder = roll => roll.value < 1
const isOpen = roll => roll.value > 90
const returnDependingOnRollType = (roll, normal, open, blunder) =>
  isBlunder(roll)
    ? blunder
    : isOpen(roll)
      ? open
      : normal

// this is usseles if the new dixe interface not uset it i thing not
function getOnlyOpensValue (rollHistory) {
  return rollHistory
    .filter((item, index, rollHistory) => index !== rollHistory.length - 1)
    .reduce((previous, current) => previous + current, 0)
}
/** Sum every time as ben called
 * @param {number} base - The number retuned first time
 * @param {number} step - The step is the value summ every time ej: base=2 step=2 => 2 4 6 8...
 * @returns {number}
 */
const addAlways = (base, step) => {
  let sum = 0
  return () => {
    let result = base + sum
    sum += step
    return result
  }
}
/** When a function result is more than a value, return this value
 * @param {number} n - the maximun value of the function
 * @param {function} f - a function that returns a Number
 * @returns {number}
 */
const stopOn = (n, f) => () => {
  let result = f()
  return result < n ? result : n
}
/** retorna la primera ocurrencia en las propiedades de un objeto de una lista de nombres
 * @param {array} matchers - lista de nombres a buscar en el objeto
 * @paran {object} aObject - el objeto donde se va a buscar las coincidencias
 * @param {any} default - el valor que se va a retornar en caso de haber coincidencias
 */
function setInObjectMatch (matchers, aObject, aDefault) {
  let toReturn = aDefault
  for (let matcher of matchers) {
    if (matcher in aObject) {
      toReturn = aObject[matcher]
      break
    }
  }
  return toReturn
}

module.exports = {
  setInObjectMatch,
  isBlunder,
  isOpen,
  returnDependingOnRollType,
  getOnlyOpensValue,
  addAlways,
  stopOn,
  OPEN: 1,
  NORMAL: 0,
  BLUNDER: -1
}
