import CommandManager from './command-manager'
import MessageManager from './message-manager'
import commands from './commands'
import messages from './messages'
import bot from './bot'

require('dotenv').config()

const messageManager = new MessageManager(
  messages,
  bot
)
const commandManager = new CommandManager(
  commands,
  { prefix: '.', messageManager }
)

bot.init(
  process.env.DISCORD_TOKEN,
  commandManager
)
