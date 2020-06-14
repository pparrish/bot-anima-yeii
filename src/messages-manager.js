import MessageManager from './message-manager'
import messages from './messages'
import bot from './bot'

export default new MessageManager(
  messages,
  bot.client
)
