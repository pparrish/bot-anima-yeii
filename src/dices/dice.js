import generator from './randomNumberGenerator'

export default class Dice {
  constructor(faces) {
    this.generator = generator(faces)
  }

  roll(times = 1) {
    const results = []
    for (let i = 0; i < times; i += 1) {
      results.push(this.generator.next().value)
    }
    if (times === 1) {
      return results[0]
    }
    return results
  }

  rollWidthRule(rule) {
    const results = []
    let reroll = true
    while (reroll) {
      const rollValue = this.generator.next()
        .value
      const { repeat, result } = rule(
        rollValue,
        results
      )
      reroll = repeat
      results.push(result)
    }
    return results
  }
}
