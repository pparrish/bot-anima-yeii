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
  try {
    message.channel.send(response)
  } catch {}
})

client.login(process.env.DISCORD_TOKEN)
