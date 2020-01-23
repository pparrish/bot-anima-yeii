const Discord = require('discord.js')
const config = require('./config')

// TODO: In the future this is the #userMagnament api
console.log(process.env)

const client = new Discord.Client()
client.login(process.env.DISCORD_TOKEN)

client.once('ready', () => {
  require('./tables').populateTableParts()
  console.log('Precarga de laa tablas completada')
  console.log('prefix:', "'" + config.prefix + "'")
})

client.on('message', async message => {
  if (!message.author.bot) {

  }
})
