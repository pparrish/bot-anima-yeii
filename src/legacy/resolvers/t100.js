const {
  pettyRollEmbed,
  getVariablesArray,
  getUserVariables,
  getToAdd
} = require('../utils/pettyRollEmbed')
/** hace una tirada de dados y envia la respuesta
 * @params {Object} commandManager recibed options
 * values = the text contains variable names and operations
 * options = the options object than have the roll options
 * @params {Object} commandManager context
 * rawResponce the responce interface
 * diceRoller
 * User
 * author
*/
module.exports = async function pettyRollResponce (
  {
    calc,
    options,
    variables
  },
  {
    rawResponce,
    diceRoller,
    user,
    author
  }
) {
  let userVariables = await getUserVariables(user)
  variables = await getVariablesArray(userVariables, variables, rawResponce)
  if (!variables) return 1

  const roll = diceRoller.rollDice('d100', options)

  let toAdd = 0
  try {
    toAdd = getToAdd(calc, userVariables)
  } catch (e) {
    await rawResponce('No puedo calcular eso')
    return 1
  }

  if (toAdd >= 10000) {
    await rawResponce(toAdd + '!!! eso es mucho no?, no voy hacer el calculo e.e')
    return 1
  }
  const richEmbed = pettyRollEmbed(author, roll, toAdd, calc)
  await rawResponce({ text: author + '', embed: richEmbed })
  return richEmbed
}
