import dotenv from 'dotenv'
import { Client } from 'discord.js'
import { BotService } from './Service'

dotenv.config()

const client = new Client()

client.once('ready', async () => {})

client.on('message', async message => {
  let response = ''

  // bot_messenger is the bot for automating testing
  if (message.author.id === process.env.BOT_MESSENGER_ID) {
    response += `${message.id}\n`
  }
  // eslint-disable-next-line no-empty
  if (!message.author.bot) {
  }

  if (response === '') return

  message.channel.send(response)
})

const clientLogin = {
  async login() {
    return this.client.login(process.env.DISCORD_TOKEN)
  },
  imOnline() {
    return this.client.status === 'online'
  },
  client
}

export default new BotService(clientLogin)
