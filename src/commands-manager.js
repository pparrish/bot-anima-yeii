import CommandManager from './command-manager'
import messagesManager from './messages-manager'
import commands from './commands'

export default new CommandManager(commands, {
  prefix: '.',
  messageManager: messagesManager,
})
