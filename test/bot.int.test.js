// @ts-nocheck
import MainBot from '../src/bot/MainBot'
import MessengerBot from './messenger_bot'
import {response} from 'express'

async function setTheBots() {
  let mainBot = {}
  let messengerBot = {}

  try {
  mainBot = await MainBot.init()
  messengerBot = await MessengerBot.init()
  } catch {
  }

  return {
    mainBot,
    messengerBot
  }
}

describe('messenger bot', () => {
  jest.setTimeout(1000 * 60)

  beforeAll(setTheBots, 1000 * 6 )

  describe('send message', () => {

    it('When a bot send a message and the main bot responce then i can get the response', async (done) => {
      const { messengerBot } = await setTheBots()
      const id = await messengerBot.send('get \nresponse')
      let response =null
      try {
      response = await messengerBot.waitForResponse(id)
      } catch {
        response = null
      }

      expect( response ).not.toBe(null)
      done();
    })

  })

  afterAll(async () => {
    await MainBot.client.destroy
    await MessengerBot.client.destroy
  })
})
