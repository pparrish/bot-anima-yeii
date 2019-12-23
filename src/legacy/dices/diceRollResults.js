// TODO: Make More roll results for d10 d100 and characteristics
class AnimaDiceRollResult {
  constructor (diceValues) {
    this._checkResult(diceValues)
    this.blunderValue = this._getBlunderValue(diceValues)
    this.openValue = this._getOpenValue(diceValues)
    this.type = this.returnDependingOnType('normal', 'open', 'blunder')
    this.value = this.returnDependingOnType(diceValues[0], diceValues.reduce((p, c) => p + c, 0), diceValues[1])
    this.rollHistory = diceValues.map((t) => Math.abs(t))
    this.openCount = this.returnDependingOnType(null, this.rollHistory.length - 1, null)
  }
  returnDependingOnType (normal, open, blunder) {
    return (this.isBlunder())
      ? blunder
      : this.isOpen()
        ? open
        : normal
  }
  isBlunder () {
    return !!this.blunderValue
  }
  isOpen () {
    return !!this.openValue
  }
  _getOpenValue (diceValues) {
    if (!this.isBlunder()) {
      return diceValues.slice(0, diceValues.length - 1).reduce((previous, current) => {
        return previous + current
      }, 0)
    } else return null
  }
  _getBlunderValue (diceValues) {
    if (diceValues.length === 2) {
      if (diceValues[1] < 0) return diceValues[0]
    } else return null
  }
  _checkResult (diceValues) {
    diceValues.map((value, index, diceValues) => {
      if (diceValues.length === 0) throw new Error('The result is empty')
      if (diceValues.length === 2) {
        if (value < -100) throw new Error('The blunder cant be less than -100')
        if (index !== diceValues.length - 1) {
          if (value < 1) throw new Error('The values cant be negative')
        }
      } else {
        if (value < 1) throw new Error('The values cant be negative')
      }
    })
  }
}

module.exports = {
  AnimaDiceRollResult
}
