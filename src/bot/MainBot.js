import dotenv from 'dotenv'
import { Client } from 'discord.js'
import { BotService } from './Service'
/* legacy */
import { rawMessage } from '../legacy/utils/messagesHelpers'
import  animaDiceRoller  from '../legacy/dices'
const commandManager = require('../legacy/commandManager')

dotenv.config()

const client = new Client()

/* legacy */
const db = require('../legacy/firebase').database

client.once('ready', async () => {
  console.log("listo")})

client.on('message', async message => {
  let response = ''

  // bot_messenger is the bot for automating testing
  if (message.author.id === process.env.BOT_MESSENGER_ID) {
    response += `${message.id}\n`
  }
  // eslint-disable-next-line no-empty
  if (!message.author.bot || message.author.id === process.env.BOT_MESSENGER_ID) {

/* legacy bot commands */
const usersData = await db.ref(`users/${message.author}`)
let context = {
  rawResponce: rawMessage(message),
  user: usersData,
  author: message.author,
  diceRoller: animaDiceRoller,
  channel: message.channel,
  server: message.guild,
  client
}
await commandManager.exec(message.content, context)

}

if (response === '') return

message.channel.send(response)
})

const clientLogin = {
  async login() {
    return this.client.login(process.env.DISCORD_TOKEN)
  },
  imOnline() {
    return this.client.status === 0
  },
  client
}

export default new BotService(clientLogin)
