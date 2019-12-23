// TODO: La interaz no es necesaria, creo yo
const {
  characteristicRoll,
  habilityRoll,
  rollD10,
  rollD100
} = require('./rolls')

const defaultRollers = {
  d100: rollD100,
  d10: rollD10,
  characteristic: characteristicRoll,
  hability: habilityRoll
}

/** reprecent a interface that can roll a diferents dices */
class DiceInterface {
  constructor (rollers = defaultRollers) {
    this.rollers = rollers
    this.type = 'd100'
  }
  /** must return a array of values to procecedd */
  roll (options) {
    return this.rollers[this.type](options)
  }
  set (type) {
    if (!this.rollers[type]) throw new Error(`${type} can´t be handled`)
    this.type = type
    return this
  }
  add (name, fn) {
    this.rollers[name] = fn
  }
}

const dd = new DiceInterface()
module.exports = dd
