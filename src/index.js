import dotenv from 'dotenv'
import { Client } from 'discord.js'

dotenv.config()

const client = new Client()

client.once('ready', async () => {
  // eslint-disable-next-line no-console
  console.log('Ready!')
})

client.on('message', async message => {
  if (!message.author.bot) {
    message.channel.send('ohhh')
  }
})

client.login(process.env.DISCORD_TOKEN)
