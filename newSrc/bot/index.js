import { Client } from 'discord.js'

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

export default {
  client,
  init: (discordToken, commandManager) => {
    client.login(discordToken)
    client.on('message', async message => {
      if (!message.author.bot) {
        const context = {
          channel: message.channel,
        }
        commandManager.exec(
          message.content,
          context
        )
      }
    })
  },
}
