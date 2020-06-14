import CommandManager from './command-manager'
import commands from './commands'
import messagesManager from './messages-manager'
import bot from './bot'

require('dotenv').config()

const commandManager = new CommandManager(
  commands,
  { prefix: '.', messagesManager }
)

bot.init(
  process.env.DISCORD_TOKEN,
  commandManager
)
