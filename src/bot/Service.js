export class BotService {
  /**
   *Creates an instance of BotService.
   * @param {object} ILogin is a interface to login to service,
   * @param {function} ILogin.login to be called when needs log
   * @param {function} ILogin.imOnline returns true when online
   * must have login method than return a promice
   * must have a imOnline method than return a boolean
   * @memberof BotService
   */
  constructor(ILogin) {
    if (!ILogin.login) throw new Error('Ilogin must have a login method')
    if (!ILogin.imOnline) throw new Error('Ilogin must have a imOnline method')
    this.loginService = ILogin
    this.login = false
    this.ready = false
  }

  /**
   *Initialize a bot service
   *
   * @returns this
   * @memberof BotService
   */
  async init() {
    if (this.login) return this

    if (this.loginService.imOnline()) {
      this.login = true
      return this
    }
    try {
      await this.loginService.login()
    } catch {
      throw new Error('The client can´t login')
    }
    this.login = true
    return this
  }
}

export class BotServiceMessenger extends BotService {
  /**
   *Creates an instance of BotServiceMessenger.
   * @param {*} ILogin - Client login service must have login and imOnline methods
   * @param {*} IMessageSender - Messenger service, can send messages
   * @param {object} IResponseStore - A stored for responses
   * @param {function} IResponseStore.get - to get a function with a id
   * @param {function} IResponseStore.iWaitingForMessage - to get a function with a id
   * @memberof BotServiceMessenger
   */
  constructor(ILogin, IMessageSender, IResponseStore) {
    super(ILogin)
    if (!IMessageSender.send) throw new Error('ImessageSender must have a send method')
    this.messageService = IMessageSender
    this.messageStore = IResponseStore
  }

  /**
   *Send a message helped with messageService
   *
   * @param {*} context the context is a substract of info for send a message
   * @returns {Promise} resolves with id of the message
   * @memberof BotServiceMessenger
   */
  async send(context) {
    const message = await this.messageService.send(context)

    if (this.messageStore && this.messageStore.store && message.id) {
      this.messageStore.store(message)
    }

    return message.id || message
  }

  get sendedMessages() {
    return this.messageStore.messages.map(x => x)
  }

  /**
   *
   *
   * @param {string} id the id of message than want the responce
   * @memberof BotServiceMessenger
   */
  getResponse(id) {
    if (this.messageStore.iWaitingForMessage(id)) return null
    if (!this.messageStore) return null
    return this.messageStore.get(id)
  }

  isMessageHaveBeenResponsed(id) {
    const message = this.messageStore.messages.find(m => m === id)
    if (!message) throw new Error('The message does not exist')
    return !!message.response
  }

  waitForResponse(id) {
    const message = this.messageStore.messages.find(m => `${m.id}` === `${id}`)
    let limit = 200
    return new Promise((resolve, reject) => {
      const notNull = () => {
        if (message.response !== null) {
          resolve(message.response)
          return
        }
        if (limit === 0) reject(new Error('time limit: not response'))
        limit -= 1
        setTimeout(notNull, 30)
      }
      notNull()
    })
  }
}
