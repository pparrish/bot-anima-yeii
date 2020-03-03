import D10 from './d10'

const d100 = new D10()

export default class CharacteristicDice {
  constructor({
    handleBlunder = true,
    handleOpen = true,
    openRequeriment = 10,
    blunderRequeriment = 1,
  } = {}) {
    this.dice = d100
    this.handleBlunder = handleBlunder
    this.blunder = false
    this.blunderRequeriment = blunderRequeriment
    this.handleOpen = handleOpen
    this.openRequeriment = openRequeriment
    this.open = false
  }

  roll() {
    const history = this.dice.rollWidthRule(
      this.rule.bind(this)
    )
    const total = history[0]
    let type = 'normal'
    if (this.open) type = 'open'
    if (this.blunder) {
      type = 'blunder'
    }
    // reset
    this.blunder = false
    this.open = false
    return {
      total,
      history,
      type,
    }
  }

  rule(value) {
    let newValue = value
    // open
    if (
      this.handleOpen &&
      value >= this.openRequeriment
    ) {
      newValue = value + 2
      this.open = true
    }

    // Blunder
    if (
      this.handleBlunder &&
      value <= this.blunderRequeriment
    ) {
      newValue = value - 3
      this.blunder = true
    }

    return { repeat: false, result: newValue }
  }
}
