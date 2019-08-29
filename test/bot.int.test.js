import MainBot from '../src/index'
import MessengerBot from './messenger_bot'

async function setTheBots() {
  const mainBot = await MainBot.init()
  const messengerBot = await MessengerBot.init()

  return {
    mainBot,
    messengerBot
  }
}

describe('messenger bot', () => {
  jest.setTimeout(30000)

  describe('init', () => {
    it('When init the messenger, get a reference of a messengerBot', async () => {
      const { messengerBot } = await setTheBots()
      expect(messengerBot).toBeTruthy()
    })
  })
  describe('send message', () => {
    it('When messenger bot send a menssage, then inform the id of message', async () => {
      const { messengerBot } = await setTheBots()

      const id = await messengerBot.send('return the id of message')

      expect(id).toBeTruthy()
    })

    it('When messenger bot send a message, then waiting for responce of main bot', async () => {
      const { messengerBot } = await setTheBots()
      const id = await messengerBot.send('waiting for responce of main bot')

      expect(messengerBot.waitingResponceOf[id]).toBeTruthy()
    })

    it('When main bot responce a message of messenger bot, then messenger bot not waiting', async () => {
      const { messengerBot } = await setTheBots()
      const id = await messengerBot.send('messenger bot not waiting')

      await messengerBot.getResponce(id)

      expect(messengerBot.waitingResponceOf[id]).toBeFalsy()
    })

    it('when messenger bot send a message, then the main bot send a message', async () => {
      const { messengerBot } = await setTheBots()

      const id = await messengerBot.send('the main bot response a message')
      const responce = await messengerBot.getResponce(id)
      expect(responce).toBe('')
    })
  })
  afterAll(async () => {
    await MainBot.client.destroy
    await MessengerBot.client.destroy
  })
})
