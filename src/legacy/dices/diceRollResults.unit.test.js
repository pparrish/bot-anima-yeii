const diceRollResults = require('../diceRollResults')

describe('AnimaDiceResult', () => {
  describe('#constructor', () => {
    test('should have a value', () => {
      const result = new diceRollResults.AnimaDiceRollResult([10])
      expect(result).toHaveProperty('value')
    })
    test('should have a type', () => {
      const result = new diceRollResults.AnimaDiceRollResult([10])
      expect(result).toHaveProperty('type')
    })
    test('should have a blunderValue', () => {
      const result = new diceRollResults.AnimaDiceRollResult([10])
      expect(result).toHaveProperty('blunderValue')
    })
    test('should have a openValue', () => {
      const result = new diceRollResults.AnimaDiceRollResult([10])
      expect(result).toHaveProperty('openValue')
    })
  })
  describe('Errors', () => {
    test('Should throw a error when 2 values are negative', () => {
      expect(() => new diceRollResults.AnimaDiceRollResult([ -10, -10 ])).toThrow('The values cant be negative')
    })
    test('Should throw a error when values are negative', () => {
      expect(() => new diceRollResults.AnimaDiceRollResult([ 10, -10, -10, -10 ])).toThrow('The values cant be negative')
    })
    test('Should throw a error when val blunder are less -100', () => {
      expect(() => new diceRollResults.AnimaDiceRollResult([ 10, -101 ])).toThrow('The blunder cant be less than -100')
    })
  })
})
