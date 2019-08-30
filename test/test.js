import { BotService, BotServiceMessenger } from '../src/bot/Service'

describe('BotService', () => {
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
      const fakeBoot = {
        async login() {
          return false
        },
        async imOnline() {
          return false
        }
      }
      let botService = new BotService(fakeBoot)

      botService = await botService.init()

      expect(botService).toBeTruthy()
    })
    // TODO sendContent method, getResponce method
  })
  describe('BotServiceMessenger', () => {
    describe('send messages', () => {
      it('Sending a message return the id of thad message', () => {
        const fakeClient = {
          async login() {
            return true
          },
          async imOnline() {
            return true
          },
          async send(context) {
            return 'askj12331241'
          }
        }
        const messengerClient = new BotServiceMessenger(fakeClient, fakeClient)
        messengerClient.init()

        const id = await messengerClient.send('')

        expect(id).toBeTruthy()
      })
    })
  })
})
