const { AnimaDiceRollResult } = require('./diceRollResults')
const { setInObjectMatch } = require('./utils')

const returnPropertyOf = (object) => (matchers, def) =>
  setInObjectMatch(matchers, object, def)
/** represents a subject that can roll a dice and chose the result to return */
class AnimaDiceRoller {
  constructor (diceInterface) {
    this._checkDiceInterface(diceInterface)
    this.diceInterface = diceInterface
  }
  rollDice (type, options = {}) {
    options = this.traduceOptions(type, options)
    if (!options._traduced) throw new Error('The use traduceOptions before')
    // TODO: made a handler to hability y characteristic, d100 y d10
    /** The basic hability d100 dice
     * default behaibor
     * the openRequeriment is 90
     * the blunderRequirement is 3
     * the mastery happens if the giben habilityBase >= 200
     * blunder is truw
     * open is true
    */
    if (type === 'hability') {
      let rollResult = this.diceInterface.set(type).roll(options)
      return new AnimaDiceRollResult(rollResult)
    }
    if (type === 'd100') {
      if (options.open === true || options.blunder === true) {
        let rollResult = this.diceInterface.set('hability').roll(options)
        return new AnimaDiceRollResult(rollResult)
      } else {
        let rollResult = this.diceInterface.set('d100').roll(options)
        return new AnimaDiceRollResult([rollResult])
      }
    }
    if (type === 'd10') {
      let rollResult = this.diceInterface.set('d10').roll(options)
      return new AnimaDiceRollResult([rollResult])
    }
    if (type === 'characteristic') {
      let rollResult = this.diceInterface.set('characteristic').roll(options)
      return new AnimaDiceRollResult([rollResult])
    }
  }

  _checkDiceInterface (diceInterface) {
    if (!diceInterface) throw new Error('Need a diceInterface')
    if (typeof diceInterface.roll !== 'function') throw new Error('diceInterface need a .roll interface')
    if (typeof diceInterface.set !== 'function') throw new Error('diceInterface need a .type interface')
  }
  traduceOptions (type, options) {
    if (type === 'hability') return this._traduceToHability(options)
    if (type === 'd100') return this._traduceTod100(options)
    if (type === 'd10') return this._traduceToD10(options)
    if (type === 'characteristic') return this._traduceToCharacteristic(options)
    return {}
  }
  _traduceToD10 (options = {}) {
    let toSendOptions = {}
    toSendOptions._traduced = true
    return toSendOptions
  }
  _traduceToCharacteristic (options = {}) {
    let toSendOptions = {}
    toSendOptions._traduced = true
    return toSendOptions
  }
  _traduceToHability (options = {}) {
    let toSendOptions = {}
    let rp = returnPropertyOf(options)
    toSendOptions.habilityBase = rp(
      ['habilidadbase',
        'hb',
        'habilidadbase',
        '__habilityBase'],
      0
    )
    toSendOptions.baseToMastery = rp(
      ['basemaestria',
        'basemastery',
        'bm'],
      200
    )
    toSendOptions.mastery = rp(
      ['maestria',
        'mastery',
        'm'],
      toSendOptions.habilityBase >= toSendOptions.baseToMastery
    )
    toSendOptions.goodLuck = rp(
      ['buenasuerte',
        'bs',
        'goodluck',
        'gl'],
      false)
    toSendOptions.badLuck = rp(
      ['malasuerte',
        'ms',
        'badluck',
        'bl'],
      false)
    toSendOptions.unableToMistake = rp(
      ['nopuedefallar',
        'nf',
        'unabletomistake',
        'um'],
      false)
    toSendOptions.open = rp(
      ['abierta',
        'a',
        'open',
        'o'],
      true)
    toSendOptions.openRequeriment = rp(
      ['requerimientoabierta',
        'ra',
        'openrequeriment',
        'or'],
      90)
    toSendOptions.blunder = rp(
      ['pifia',
        'p',
        'blunfer',
        'b'],
      true)
    toSendOptions.blunderRequeriment = rp(
      ['requerimentopifia',
        'rp',
        'blunderrequeriment',
        'br'],
      3)
    toSendOptions._traduced = true
    return toSendOptions
  }
  _traduceTod100 (options) {
    let toSendOptions = {}
    let rp = returnPropertyOf(options)
    toSendOptions.habilityBase = rp(
      ['habilidadbase',
        'hb',
        'habilidadbase',
        'detectedHabilityBase'],
      0
    )
    toSendOptions.baseToMastery = rp(
      ['basemaestria',
        'basemastery',
        'bm'],
      200
    )
    toSendOptions.mastery = rp(
      ['maestria',
        'mastery',
        'm'],
      false
    )
    if (toSendOptions.mastery === 'detect') {
      toSendOptions.mastery = toSendOptions.habilityBase >= toSendOptions.baseToMastery
    }
    toSendOptions.goodLuck = rp(
      ['buenasuerte',
        'bs',
        'goodluck',
        'gl'],
      false)
    toSendOptions.badLuck = rp(
      ['malasuerte',
        'ms',
        'badluck',
        'bl'],
      false)
    toSendOptions.unableToMistake = rp(
      ['nopuedefallar',
        'nf',
        'unabletomistake',
        'um'],
      false)
    toSendOptions.open = rp(
      ['abierta',
        'a',
        'open',
        'o'],
      false)
    toSendOptions.openRequeriment = rp(
      ['requerimientoabierta',
        'ra',
        'openrequeriment',
        'or'],
      90)
    toSendOptions.blunder = rp(
      ['pifia',
        'p',
        'blunfer',
        'b'],
      false)
    toSendOptions.blunderRequeriment = rp(
      ['requerimientopifia',
        'rp',
        'blunderrequeriment',
        'br'],
      3)
    toSendOptions._traduced = true
    return toSendOptions
  }
}
module.exports = AnimaDiceRoller
