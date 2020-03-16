/* eslint-env jest */
import lifePoints from './life-points'
import Life from '../anima/life'

describe('Life points command', () => {
  let context
  let messenger
  beforeEach(() => {
    messenger = {
      message: '',
      send(message, payload) {
        this.message = message
        this.payload = payload
      },
      payload: {},
    }

    context = {
      storage: {
        _life: new Life(null),
        get life() {
          return this._life
        },
        set life(x) {
          this._life = x
        },
        selectedSheet: {
          variables: {},
        },
      },
    }
  })

  test('when mod is 100 then life is 100', async () => {
    await lifePoints(
      { points: '', mod: '100' },
      context,
      messenger
    )
    expect(context.storage.life.value).toBe(100)
  })
  test('when mod is 100 and points is 10 then life is 110', async () => {
    await lifePoints(
      { points: '10', mod: '100' },
      context,
      messenger
    )
    expect(context.storage.life.value).toBe(110)
  })
  test('when mod is "=" and points is "100" then life is 110', async () => {
    await lifePoints(
      { points: '100', mod: '=' },
      context,
      messenger
    )
    expect(context.storage.life.value).toBe(100)
  })
  test('when mod is = and points is "" then the life is null and messenger is "life not points"', async () => {
    await lifePoints(
      { points: '', mod: '=' },
      context,
      messenger
    )
    expect(context.storage.life.value).toBe(null)
    expect(messenger.message).toBe(
      'life not points'
    )
  })
  test('when mod is = and points is "100" then the life is 100', async () => {
    await lifePoints(
      { points: '100', mod: '=' },
      context,
      messenger
    )
    expect(context.storage.life.value).toBe(100)
  })
  describe('Life is null', () => {
    test('when mod is + and points is "10" then the life is null and messenger is "life not points"', async () => {
      await lifePoints(
        { points: '10', mod: '+' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(
        null
      )
      expect(messenger.message).toBe(
        'life is null'
      )
    })
    test('when mod is - and points is "10" then the life is null and messenger is "life is null"', async () => {
      await lifePoints(
        { points: '10', mod: '-' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(
        null
      )
      expect(messenger.message).toBe(
        'life is null'
      )
    })
    test('when mod is % and points is "10" then the life is null and messenger is "life is null"', async () => {
      await lifePoints(
        { points: '10', mod: '%' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(
        null
      )
      expect(messenger.message).toBe(
        'life is null'
      )
    })
    test('when mod is +% and points is "10" then the life is null and messenger is "life is null"', async () => {
      await lifePoints(
        { points: '10', mod: '+%' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(
        null
      )
      expect(messenger.message).toBe(
        'life is null'
      )
    })
    test('when mod is -% and points is "10" then the life is null and messenger is "life is null"', async () => {
      await lifePoints(
        { points: '10', mod: '-%' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(
        null
      )
      expect(messenger.message).toBe(
        'life is null'
      )
    })
  })
  describe('Life is 100', () => {
    beforeEach(() => {
      context.storage.life = new Life(100)
    })
    test('when mod is + and points is "100" then the life is 200', async () => {
      await lifePoints(
        { points: '100', mod: '+' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(200)
    })
    test('when mod is - and points is "50"  then the life is 50', async () => {
      await lifePoints(
        { points: '50', mod: '-' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(50)
    })
    test('when mod is % and points is "20" then the life is 20', async () => {
      await lifePoints(
        { points: '20', mod: '%' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(20)
    })
    test('when mod is +% and points is "30" then the life is 130', async () => {
      await lifePoints(
        { points: '30', mod: '+%' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(130)
    })
    test('when mod is -% and points is "40" then the life is 60', async () => {
      await lifePoints(
        { points: '40', mod: '-%' },
        context,
        messenger
      )
      expect(context.storage.life.value).toBe(60)
    })
  })
})
