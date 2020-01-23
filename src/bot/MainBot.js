import dotenv from 'dotenv'
import { Client } from 'discord.js'
import { BotService } from './Service'
/* legacy */
import CommandManager from '../legacy/commands/commandManager'
import { rawMessage } from '../legacy/utils/messagesHelpers'
import animaDiceRoller from '../legacy/dices'
import {replaceFrobidenCharacters, recoverFrobidenCharacters} from '../utils'

const Queue = require('bull')
const commandManager = require('../legacy/commandManager')

dotenv.config()

// Connect to a local redis intance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

// Create / Connect to a named work queue
const workQueue = new Queue('work', REDIS_URL)

const client = new Client()

/* legacy */
const db = require('../legacy/firebase').database

client.once('ready', async () => {
  console.log('Bot listo')
})

// PROVITIONAL COMMAND MANAGER USE FOR TRANCITIONS
const handleCharacterSheed = async ({ name }, { user, rawResponce, attachments }) => {
  const firstAttachment = attachments.first()
  const filename = firstAttachment?.filename
  const isNameRecibed = !!name
  const isExelRecibed = filename?.split('.')?.pop() === 'xlsm'

  if(isExelRecibed) {
    //read the exel
    const job = await workQueue.add({ url: firstAttachment.url })
    rawResponce('Procesando')
    const sheet = await job.finished()
    let referenceToSaveSheet = user.child('sheets')
    if(isNameRecibed)
      referenceToSaveSheet = referenceToSaveSheet.child(
        replaceFrobidenCharacters(name)
      )
    else
      referenceToSaveSheet = referenceToSaveSheet.child(
        'default'
      )

    referenceToSaveSheet.set(sheet)
    user.child('variables').set(sheet)
    rawResponce('Ficha cambiada usa gv para ver tus resultados')
    return
  } else {
    const sheets = (await user.child('sheets').once('value')).val()
    const sheetNames = sheets === null ? [] : Object.keys(sheets).map(sheetName => recoverFrobidenCharacters(sheetName) )
    if(!sheets === null) {
      rawResponce(`
No tienes nunguna ficha guardada, usa estos comandos para guardar alguna.
** Guardar una ficha default **
\`\`\`.ficha [adjuntar exel en el mismo mensaje]\`\`\`
** Guardar una ficha y darle un nombre **
\`\`\`.ficha nombre [adjuntar exel en el mismo mensaje]\`\`\`
        `)
      return
    }
    if(!isNameRecibed) {
      let message = '**Fichas guardadas**\n'
      sheetNames.map((sheetName, index) => {
        message += `${index + 1} : ${sheetName}\n`
        return message
      })
      rawResponce(message)
      return
    }
    const isNameIndex = !isNaN(Number(name))
    let data = null
    let selected = null
    if(isNameIndex) {
      let index = Number(name) - 1
      if(sheetNames[index]) {
        //TODO WTF
        let sheetName = recoverFrobidenCharacters(sheetNames[index])
        data = sheets[replaceFrobidenCharacters(sheetNames[index])]
        selected = sheetName
      } else {
        let message = '**Fichas guardadas**\n'
        sheetNames.map((sheetName, index) => {
          message += `${index + 1} : ${sheetName}\n`
          return message
        })
        rawResponce(message)
        return
      }
    } else {
      let words = name.split(' ')
      let lastIndex = 0
      let results = sheetNames.filter((sheetName, index) => {
        let isMatch = false
        if(name === sheetName) isMatch = true 
        words.map(word => {
          isMatch = isMatch || sheetName.toLowerCase().includes(word.toLowerCase())
          lastIndex = isMatch ? index : lastIndex
          return isMatch
        })
        return isMatch
      }) 
      if(results.length === 1) {
        data = sheets[replaceFrobidenCharacters(sheetNames[lastIndex])]
        selected = sheetNames[lastIndex]
      } else {
        rawResponce(`resultados con las palabras ${words}`)
        results.map(x => rawResponce(`${sheetNames.indexOf(x)+1}: ${x}`))
        return
      }
    }
    if(data !== null) {
      user.child('variables').set(data)
      rawResponce(`haz cambiado a ${selected}`)
    } else {
      rawResponce('ficha no encontrada')
      names.map((x,i) => rawResponce(`${i+1}: ${x}`))
    }
    return
  }
}

const provitionalCommandManager = new CommandManager({
  prefix: '',
  commands: [
    {
      name: 'ficha',
      options: {
        name: {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: handleCharacterSheed
    }
  ]
})

client.on('message', async message => {
  let response = ''
  if (message.author.id === process.env.BOT_MESSENGER_ID) {
    response += `${message.id}\n`
  }
  // eslint-disable-next-line no-empty
  if (!message.author.bot || message.author.id === process.env.BOT_MESSENGER_ID) {
    /* legacy bot commands */
    const usersData = db.ref(`v0/users/${message.author}`)

    const context = {
      rawResponce: rawMessage(message),
      user: usersData,
      author: message.author,
      diceRoller: animaDiceRoller,
      channel: message.channel,
      server: message.guild,
      attachments: message.attachments,
      client
    }

    await commandManager.exec(message.content, context)
    await provitionalCommandManager.exec(message.content, context)

    /*
    const first = message.attachments.first()
    if (
      first &&
      first.filename &&
      first.filename.split('.').pop() === 'xlsm' &&
      message.content === '.ficha'
    ) {
      message.channel.send('Procesando ficha, voy a tardar un poco u.u se paciente')
      usersData.child('variables').update(values)
      message.channel.send('Ficha pprocesada, usa .gv para ver todoss los valores que guarde')
    }
  */
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
