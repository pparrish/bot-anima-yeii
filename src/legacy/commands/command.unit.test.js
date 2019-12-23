const command = require('./command.js')

describe('command', () => {
  describe('isPrefixedWith', () => {
    describe('"." (point) prefix ', () => {
      const isPointPrefixed = command.isPrefixedWith('.')
      test('Should be true with ".command"', () => {
        let text = '.command'
        expect(isPointPrefixed(text)).toBe(true)
      })
      test('Should be false with " .command"', () => {
        let text = ' .command'
        expect(isPointPrefixed(text)).toBe(false)
      })
      test('Should be false with "bjsk jsje"', () => {
        let text = 'bjsk jsje'
        expect(isPointPrefixed(text)).toBe(false)
      })
    })
  })
  describe('getCommandName', () => {
    test('Should return cd from ".cd"', () => {
      let text = '.cd'
      let result = command.getCommandName(text, true)
      expect(result).toBe('cd')
    })
    test('Should return cd from "cd" (non prefixed)', () => {
      let text = 'cd'
      let result = command.getCommandName(text)
      expect(result).toBe('cd')
    })
  })
  describe('getCommandOptions', () => {
    describe('getOptionsText', () => {
      test('".t tirada 20" Should return "tirada 20"', () => {
        let aCommand = '.t tirada 20'
        let result = command.getOptionsText(aCommand)
        expect(result).toBe('tirada 20')
      })
    })
  })
  describe('Scopes', () => {
    // TODO change this scopes, there ir not the api
    describe('all, all text of options', () => {
      test('Parse "personaje generico"', () => {
        let toParse = 'personaje Generico'
        let result = command.all(toParse, 'personaje')
        expect(result).toEqual({ name: 'personaje', value: 'personaje Generico' })
      })
    })
    describe('num, all numbers in options', () => {
      test('Parse "20 -50+60-30 -20 +20"', () => {
        let toParse = '20 -50+60-30 -20 +20'
        let result = command.nums(toParse, 'numbers')
        expect(result).toEqual({
          name: 'numbers',
          value: [20, -50, 60, -30, -20, 20]
        })
      })
    })
    describe('sumAllNums', () => {
      test('Parse "20 -50+30 -20 10 -40"', () => {
        let toParse = '20 -50+30 -20 10 -40'
        let result = command.sumAllNums(toParse, 'sum')
        expect(result).toEqual({
          name: 'sum',
          value: 20 - 50 + 30 - 20 + 10 - 40
        })
      })
    })
    // The good api
    describe('first', () => {
      describe('Consume mode', () => {
        test('"acrobacias 20" should return "20"', () => {
          let result = command.first('acrobacias 20', 'habilidad', true)
          expect(result).toEqual({
            name: 'habilidad',
            value: 'acrobacias',
            remainder: '20'
          })
        })
      })
    })
    describe('rest', () => {
      describe('Consume mode', () => {
        test('"20 10 30" get the same', () => {
          let result = command.rest('20 10 30', 'habilityValue', true)
          expect(result).toEqual({
            name: 'habilityValue',
            value: '20 10 30',
            remainder: ''
          })
        })
      })
    })
  })
})
