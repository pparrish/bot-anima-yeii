import { Client } from 'discord.js'
import AnimaStorage from '../storage/AnimaStorage'

const client = new Client()

const changeGuilsCount = () => {
  const guildNumber = client.guilds.size
  client.user.setActivity(
    `anima en ${guildNumber} servers`
  )
  setTimeout(
    changeGuilsCount,
    1000 * 60 * 60 * 12
  )
}

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
    client.on('message', async message => {
      if (!message.author.bot) {
        const context = {
          author: message.author,
          channel: message.channel,
          storage: new AnimaStorage(
            message.author.id
          ),
          attachments: message.attachments,
        }
        commandManager.exec(
          message.content,
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
    })
  },
}