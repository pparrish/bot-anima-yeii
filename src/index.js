import dotenv from 'dotenv'
import { Client } from 'discord.js'

dotenv.config()

const client = new Client()

client.once('ready', async () => {
  // eslint-disable-next-line no-console
  console.log('Ready!')
})

client.on('message', async message => {
  let response = ''
  //* on WORK!!!
  // bot_messenger is the bot for automating testing
  // eslint-disable-next-line no-empty
  if (message.author.id === process.env.BOT_MESSENGER_ID) {
    response += `${message.id}
`
  }
  // eslint-disable-next-line no-empty
  if (!message.author.bot) {
  }

  if (response === '') return

  message.channel.send(response)
})

export default {
  login: false,
  ready: false,
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

    try {
      await this.client.login(process.env.DISCORD_TOKEN)
    } catch {
      throw new Error('The client can´t login')
    }
    this.login = true
    return this
  },
  client
}
