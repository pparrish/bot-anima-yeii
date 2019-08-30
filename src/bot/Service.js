export class BotService {
  /**
   *Creates an instance of BotService.
   * @param {*} ILogin is a interface to login to service,
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

    if (this.loginService.imOnline) {
      this.login = true
      return this
    }
    try {
      await this.logToLoginService()
    } catch {
      throw new Error('The client can´t login')
    }

    return this
  }

  async logToLoginService() {
    await this.loginService.login()
    this.login = true
    return true
  }
}

export class BotServiceMessenger extends BotService {}
