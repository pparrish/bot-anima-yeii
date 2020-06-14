import commandsManager from './commands-manager'
import bot from './bot'

require('dotenv').config()

bot.init(
  process.env.DISCORD_TOKEN,
  commandsManager
)
