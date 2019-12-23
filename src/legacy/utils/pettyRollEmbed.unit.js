//TODO: this not work!!! 

const pettyRollResponce = require('./pettyRollEmbed')
const { AnimaDiceRollResult } = require('../dices/diceRollResults')
describe('#pettyRollResponce', () => {
  var mockVariables = {}
  var mockOptions = {}
  var mockContext = {}

  beforeEach(() => {
    mockVariables = jest.fn().mockReturnValue({})
    mockOptions = {
      values: '' }
    mockContext = {
      rawResponce: jest.fn((x) => x & console.log(x)),
      diceRoller: {
        rollDice: jest.fn().mockReturnValue(new AnimaDiceRollResult([50]))
      },
      user: {
        child () {
          return { once () { return { val: mockVariables } } }
        }
      },
      author: {
        username: 'test',
        avatarURL: 'http//..'
      }
    }
  })

  test('Empty value "" ', async () => {
    let result = await pettyRollResponce(mockOptions, mockContext)
    expect(result).not.toBe(1)
    expect(result.fields[0].value).toContain('50')
  })
})
