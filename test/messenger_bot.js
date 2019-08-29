import dotenv from 'dotenv'

import { Client } from 'discord.js'

dotenv.config()

const client = new Client()

export default {
  async init() {
    if (this.login) return this
    if (this.ready) return this
    if (this.client.status === 'online') {
      this.login = true
      return this
    }

    client.once('ready', async () => {
      // eslint-disable-next-line no-console
      this.ready = true
    })

    client.on('message', async message => {
      if (message.author.id === process.env.TEST_DISCORD_TOKEN_ID) {
        const [id, ...rest] = message.content.split('\n')
        this.waitingResponceOf[id] = false
        this.responceOf[id] = rest.join('\n')
      }
    })

    try {
      await this.client.login(process.env.BOT_MESSENGER)
    } catch {
      throw new Error('The client can´t login')
    }
    this.login = true
    return this
  },
  async send(text) {
    if (!this.ready) this.init()
    await this.sleep(500)
    const testGuild = client.guilds.get(`${process.env.BOT_TEST_GUILD}`)
    const testChannel = testGuild.channels.get(`${process.env.BOT_TEST_CHANNEL}`)

    let message = null
    try {
      message = await testChannel.send(text)
    } catch (e) {
      throw new Error(`Cant send the message : ${e}`)
    }

    this.waitingResponceOf[message.id] = true

    return message.id
  },
  async getResponce(id) {
    while (this.waitingResponceOf[id]) {
      await this.sleep(500)
    }
    return this.responceOf[id]
  },
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  login: false,
  ready: false,
  waitingResponceOf: {},
  responceOf: {},
  client
}
