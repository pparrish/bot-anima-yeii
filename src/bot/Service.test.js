import { BotService, BotServiceMessenger } from './Service'

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
    })
    describe('get Responces', () => {
      it('Request a responce return null when not response', async () => {
        const fakeStore = {
          waiting: false,
          messages: {
            askj12331241: null
          },
          async get(id) {
            return this.messages[id]
          },
          iWaitingForMessage() {
            return this.waiting
          }
        }

        const fakeMessengerWithOnMessage = {
          async send() {
            return 'askj12331241'
          },
          onMessage() {
            fakeStore.waiting = false
          }
        }

        const messengerClient = new BotServiceMessenger(
          fakeClient,
          fakeMessengerWithOnMessage,
          fakeStore
        )
        await messengerClient.init()

        const id = await messengerClient.send('')

        expect(await messengerClient.getResponse(id)).toBe(null)
      })

      it('Request a responce return responce when have response', async () => {
        const fakeStore = {
          waiting: false,
          messages: {
            askj12331241: null
          },
          async get(id) {
            return this.messages[id]
          },
          iWaitingForMessage() {
            return this.waiting
          }
        }

        const fakeMessengerWithOnMessage = {
          async send() {
            return 'askj12331241'
          },
          onMessage(id) {
            fakeStore.messages[id] = 'return'
            fakeStore.waiting = false
          }
        }

        const messengerClient = new BotServiceMessenger(
          fakeClient,
          fakeMessengerWithOnMessage,
          fakeStore
        )
        await messengerClient.init()

        const id = await messengerClient.send('return')
        fakeMessengerWithOnMessage.onMessage(id)

        expect(await messengerClient.getResponse(id)).toBe('return')
      })
    })
  })
})
