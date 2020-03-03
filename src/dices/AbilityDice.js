import D100 from './d100'

const d100 = new D100()

export default class AbilityDice {
  constructor({
    handleBlunder = true,
    handleOpen = true,
    openRequeriment = 90,
    blunderRequeriment = 3,
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
    let total = history.reduce((a, b) => a + b, 0)
    let type = 'normal'
    if (this.open) type = 'open'
    if (this.blunder) {
      type = 'blunder'
      // eslint-disable-next-line prefer-destructuring
      total = history[1]
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

  rule(value, history) {
    let repeat = false
    // open
    if (this.handleOpen && !this.blunder)
      repeat = this.openRule(value)

    // Blunder
    if (this.handleBlunder && !this.open)
      repeat = this.blunderRule(
        value,
        history.length
      )

    return { repeat, result: value }
  }

  blunderRule(value, rollNumber) {
    if (
      rollNumber === 0 &&
      value <= this.blunderRequeriment
    ) {
      this.blunder = true
      return true
    }
    return false
  }

  openRule(value) {
    if (
      value >= this.openRequeriment ||
      value === 100
    ) {
      this.open = true
      this.openRequeriment += 1
      return true
    }

    return false
  }
}
