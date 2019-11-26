import dotenv from 'dotenv'

import { Client } from 'discord.js'
import { BotServiceMessenger } from '../src/bot/Service'

dotenv.config()

const messengerClient = new Client()

const responseStore = {
  messages: [],
  store (message) {
    this.messages.push({
      response: null,
      ...message
    })
  }
}

const messageSender = {
  async send (text) {
    const sendChannel = this.client.guilds
      .get(process.env.BOT_TEST_GUILD)
      .channels.get(process.env.BOT_TEST_CHANNEL)

    let message = null
    try {
      message = await sendChannel.send(text)
    } catch (e) {
      throw new Error(`Cant send the message : ${e}`)
    }
    return {
      id: message.id,
      text
    }
  },
  client: messengerClient
}

const clientLogin = {
  async login () {
    return this.client.login(process.env.BOT_MESSENGER)
  },
  imOnline () {
    return this.client.status === 0
  },
  client: messengerClient
}

messengerClient.on('message', async message => {
  if (message.author.id + ''  === process.env.TEST_DISCORD_TOKEN_ID) {
    const [id, ...rest] = message.content.split('\n')
    
    const storedMessage = responseStore.messages.find(message => message.id === id )

    if(storedMessage && storedMessage.response === null ) {
    storedMessage.response = rest.join('\n')
    }
  }
})

export default new BotServiceMessenger(clientLogin, messageSender, responseStore)
