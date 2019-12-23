// this is the module for the command manager.
// this must be the /utils module
// TODO this name to utils
const commandsUtil = require('./command')
// this is the nain of module
class CommandManager {
  /** Agrega el prefiz del mabager y obtiene los comandos */
  constructor ({ prefix = '', commands = [] } = {}) {
    this.prefix = prefix
    this.commands = {}
    if (commands.length !== 0) { this.addComands(commands) }
  }
  /** ejecuta un comando con el contexto dado **/
  // TODO changue CommandsArgs for context
  exec (aCommand, ...commandArgs) {
    let isPrefixed = commandsUtil.isPrefixedWith(this.prefix)(aCommand)
    if (isPrefixed) {
      let commandName = commandsUtil.getCommandName(aCommand, isPrefixed)
      let toParse = commandsUtil.getOptionsText(aCommand)
      // maybe to isInCommands
      // uses a commandsList?
      if (commandName in this.commands) {
        let command = this.commands[commandName]
        let options = {}
        // maybe to populare options
        for (let option in command.options) {
          // maybe to getOption toparwe option name mode
          let result
          let optionName = option
          option = command.options[option]
          // TODO: manage consume mode
          // predefined scopes
          if (option.scope === 'first') {
            result = commandsUtil.first(toParse, optionName, option.mode === 'consume')
          } else if (option.scope === 'rest') {
            result = commandsUtil.rest(toParse, optionName, option.mode === 'consume')
          } else {
            // Not predefined
            result = option.scope(toParse, optionName, option.mode === 'consume')
          }
          // maibe end of getOption
          // maybe the return of populate options {...result}
          options[result.name] = result.value
          toParse = result.remainder
        }
        // maybe end of populareOptions
        return command.resolver(options, ...commandArgs)
      } else {
        return this.notCommand ? this.notCommand() : -1
      }
    } else {
      return this.incorectPrefix ? this.incorectPrefix() : -1
    }
  }
  commandsList () {
    let list = []
    for (let command in this.commands) list.push(command)
    return list
  }
  addComand (command) {
    if (command) { this.commands[command.name] = command }
    return this
  }
  addComands (commands = []) {
    commands.map(command => this.addComand(command))
    return this
  }
}

module.exports = CommandManager
