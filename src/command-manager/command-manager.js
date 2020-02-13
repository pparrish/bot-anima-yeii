/** A entity to hadle the commands.
 * @param {Array} commands - A store for all commands to handle.
 * @param {Object} options
 * @param {string} options.prefix - The prefix for filter messages.
 * @param {Object} options.messageManager - A handler for exit messages from commands.
 */
export default class CommandManager {
  constructor(
    commands = [],
    { prefix = '', messageManager = null } = {}
  ) {
    this.prefix = prefix
    this.commands = {}
    this.messageManager = messageManager

    if (
      Array.isArray(commands) &&
      commands.length <= 1
    ) {
      this.addCommandsFromArray(commands)
    }
  }

  /** Add every command in a array into manager
   * @param {Array} commands
   */
  addCommandsFromArray(commands) {
    commands.map(this.addCommand)
    return this
  }

  /** add a command to handle.
   * @param {Object} command
   * @param {string} command.name - The name of the command, the manager will use this name to run the command.
   * @param {function} command.resolver - The function to run when the command is called acepts a options object, a context object and a messageManager object.
   * @param {Array} command.options - A array of options to parse when execute the message.
   */
  addCommand(command = {}) {
    this.commands[command.name] = command
    return this
  }

  /** check the input string for a prefix and a command, if find it then execute the command.
   * @param {string} inputString - The string to be inspected for the command manager to extract the command, prefix, and options of a posible command.
   * @param {Object} context - A object to store all utils and data for the correct work of a command.
   */
  exec(inputString = '', context = {}) {
    if (!this.isPrefixed(inputString))
      return false
    const commandName = this.getCommandName(
      inputString
    )
    const command = this.getCommand(commandName)
    if (command === null) return false

    const workingString = this.getOptionsText(
      inputString,
      commandName
    )
    const options = this.createOptions(
      workingString,
      command.options,
      context
    )

    return command.resolver(
      options,
      context,
      this.messageManager
    )
  }

  isPrefixed(string) {
    return string.startsWith(this.prefix)
  }

  getCommandName(string) {
    // The command name is the first word witoud the prefix
    return string
      .slice(this.prefix.length)
      .split(' ')[0]
  }

  getCommand(commandName) {
    if (!commandName) return null
    const command = this.commands[commandName]
    if (!command) return null
    return command
  }

  getOptionsText(string, commandName) {
    // Remove the command name the prefix and the space
    return string.slice(
      this.prefix.length + commandName.length + 1
    )
  }

  createOptions(
    string,
    optionsContainer,
    context
  ) {
    let workingString = string
    return optionsContainer.reduce(
      (options, option) => {
        const {
          value,
          remainder,
        } = option.parser(
          option.name,
          workingString,
          context
        )
        if (option.consume)
          workingString = remainder
        return {
          ...options,
          [option.name]: value,
        }
      },
      {}
    )
  }
}
