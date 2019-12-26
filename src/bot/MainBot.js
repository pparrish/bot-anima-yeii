import dotenv from 'dotenv'
import { Client } from 'discord.js'
import { BotService } from './Service'
/* legacy */
import { rawMessage } from '../legacy/utils/messagesHelpers'
import animaDiceRoller from '../legacy/dices'
const commandManager = require('../legacy/commandManager')
const Queue = require('bull');

dotenv.config()

// Connect to a local redis intance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Create / Connect to a named work queue
let workQueue = new Queue('work', REDIS_URL);

const client = new Client()

/* legacy */
const db = require('../legacy/firebase').database

client.once('ready', async () => {
  console.log('Bot listo')
})

client.on('message', async message => {
  let response = ''
  if (message.author.id === process.env.BOT_MESSENGER_ID) {
    response += `${message.id}\n`
  }
  // eslint-disable-next-line no-empty
  if (!message.author.bot || message.author.id === process.env.BOT_MESSENGER_ID) {

    /* legacy bot commands */
    const usersData = await db.ref(`users/${message.author}`)

    const context = {
      rawResponce: rawMessage(message),
      user: usersData,
      author: message.author,
      diceRoller: animaDiceRoller,
      channel: message.channel,
      server: message.guild,
      client
    }

    await commandManager.exec(message.content, context)

    const first = message.attachments.first()
    if (first && first.filename && first.filename.split('.').pop() === 'xlsm' && message.content === '.ficha') {
      message.channel.send('Procesando ficha, voy a tardar un poco u.u se paciente')
      let job = await workQueue.add({url: first.url});
      let values = await job.finished()
      usersData.child('variables').update(values)
      message.channel.send(('Ficha pprocesada, usa .gv para ver todoss los valores que guarde'))
    }
  }

  if (response === '') return
  message.channel.send(response)
})

const clientLogin = {
  async login () {
    return this.client.login(process.env.DISCORD_TOKEN)
  },
  imOnline () {
    return this.client.status === 0
  },
  client
}

export default new BotService(clientLogin)
