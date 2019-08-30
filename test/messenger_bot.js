import dotenv from 'dotenv'

import { Client } from 'discord.js'
import { BotServiceMessenger } from '../src/bot/Service'

dotenv.config()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const messengerClient = new Client()

const responseStore = {
  messagesWaiting: {},
  responses: {},
  iWaitingForMessage(id) {
    return this.messagesWaiting[id]
  },
  get(id) {
    if (this.messagesWaiting[id]) return null

    return this.responses[id]
  },
  waitingTo(id) {
    this.messagesWaiting[id] = true
  },
  unWaitingTo(id) {
    this.messagesWaiting[id] = false
  },
  storeResponse(id, response) {
    this.unWaitingTo(id)
    this.responses[id] = response
  }
}

const messageSender = {
  async send(text) {
    const sendChannel = this.client.guilds
      .get(`${process.env.BOT_TEST_GUILD}`)
      .channels.get(`${process.env.BOT_TEST_CHANNEL}`)

    let message = null
    try {
      message = await sendChannel.send(text)
    } catch (e) {
      throw new Error(`Cant send the message : ${e}`)
    }

    responseStore.waitingTo(message.id)

    await sleep(1000)
    return message.id
  },
  client: messengerClient
}

const clientLogin = {
  async login() {
    return this.client.login(process.env.BOT_MESSENGER)
  },
  imOnline() {
    return this.client.status === 0
  },
  client: messengerClient
}

messengerClient.on('message', async message => {
  if (message.author.id === process.env.TEST_DISCORD_TOKEN_ID) {
    const [id, ...rest] = message.content.split('\n')
    responseStore.storeResponse(id, rest.join('\n'))
  }
})

export default new BotServiceMessenger(clientLogin, messageSender, responseStore)
