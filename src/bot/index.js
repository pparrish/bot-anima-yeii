import { Client, Intents } from 'discord.js'
import AnimaStorage from '../storage/AnimaStorage'

const FLAGS = [
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILDS,
]

const client = new Client({
  intents: FLAGS,
  partials: ['CHANNEL'],
})

client.once('ready', () => {
  /* eslint-disable no-console */
  console.log('bot ready')
  changeGuilsCount()
})

process.on('exit', () => {
  client.destroy()
})

export default {
  client,
  init: (discordToken, commandManager) => {
    client.login(discordToken)
    client.on(
      'messageCreate',
      async (message) => {
        if (!message.author.bot) {
          const context = {
            author: message.author,
            channel:
              message.mentions.users.first()
                ? message.mentions.users.first()
                : message.channel,
            storage: new AnimaStorage(
              message.author.id
            ),
            attachments: message.attachments,
            collectorChannel: message.channel,
          }
          if (
            commandManager.isPrefixed(
              message.content
            ) &&
            process.env.NODE_ENV !==
              'development' &&
            message.author.id !==
              '483477752155209728'
          )
            context.storage.crud.increment(
              'used-commands',
              message?.guild?.name,
              message.content
            )
          const messageNonFirstMention =
            message.content.replace(/<.*>\s*/, '')
          commandManager.exec(
            messageNonFirstMention,
            context
          )
        }
        if (
          message.author.id ===
            '483477752155209728' &&
          message.content === '!!!!!stop'
        ) {
          client.destroy()
          process.exit(1)
        }
      }
    )
  },
}
