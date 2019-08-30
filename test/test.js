import { BotService, BotServiceMessenger } from '../src/bot/Service'

describe('BotService', () => {
  const fakeClient = {
    online: false,
    async login() {
      this.online = true
      return true
    },
    async imOnline() {
      return this.online
    }
  }
  describe('Constructor', () => {
    it('When call with not  valid login service, throw a error', () => {
      const fakeBoot = {}
      expect(() => {
        // eslint-disable-next-line no-new
        new BotService(fakeBoot)
      }).toThrow('Ilogin must have a login method')
    })
  })
  describe('init', () => {
    it('When init the BotService, get a reference of a botService', async () => {
      let botService = new BotService(fakeClient)

      botService = await botService.init()

      expect(botService).toBeTruthy()
    })
  })
  describe('BotServiceMessenger', () => {
    const fakeMessenger = {
      async send() {
        return 'askj12331241'
      }
    }

    async function initService() {
      const messengerClient = new BotServiceMessenger(fakeClient, fakeMessenger)
      await messengerClient.init()
      return messengerClient
    }

    describe('send messages', () => {
      it('Sending a message return the id of that message', async () => {
        const messengerClient = await initService()

        const id = await messengerClient.send('')

        expect(id).toBeTruthy()
      })

      it('When sending a message, then the Service mode is waiting for message', async () => {
        const messengerClient = await initService()

        const id = await messengerClient.send('')

        expect(messengerClient.iWaitingForMessage(id)).toBeTruthy()
      })
    })
    describe('get Responces', () => {
      it('Request a responce return null when not responce', async () => {})
    })
  })
})
