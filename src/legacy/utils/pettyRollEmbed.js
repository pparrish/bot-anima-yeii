const { RichEmbed } = require('discord.js')
const { Parser } = require('expr-eval')

const mp = new Parser()
// exlude all consts in the parser of expr-eval
mp.consts = {}

// This is work for dices
const BLUNDER = -1
const NORMAL = 0
const OPEN = 1

module.exports.pettyRollEmbed = function pettyRollEmbed(author, roll, toAdd, calc) {
  // TODO: This can be a function or part of createPettyRollRichEmbed
  return createPettyRollRichEmbed({
    name: author.username,
    picture: author.image ?? author.avatarURL,
    rollType: roll.returnDependingOnType(
      'tirada normal.',
      `Tirada con ${roll.openCount} abierta(s).`,
      `Pifia.`
    ),
    result: roll.returnDependingOnType(roll.value + toAdd, roll.value + toAdd, roll.value),
    calc: roll.returnDependingOnType(
      roll.rollHistory.join(' + ') + (calc !== '' ? '+' : '') + calc,
      roll.rollHistory.join(' + ') + (calc !== '' ? '+' : '') + calc,
      roll.blunderValue
    ),
    showCalc: roll.returnDependingOnType(true, true, false),
    type: roll.returnDependingOnType(NORMAL, OPEN, BLUNDER)
  })
}

/** crea un embed roll con la planrilla de dados
 * @param {object} options - Recibe las opciones de visualizacion
 * name - nomvre de el que tiro el dado
 * picture - url a la image  que se mostrara eb el emvked
 * type - BLUNDER NORMAL OPEN aka -1 0 1
 * result - valor nunerico de la tirada
 * calc - cadena de texto cobblos calculos de la tirada
 * rollType - cadena de texto xob el tipo de tirada
 * showCalc - muestra los calcukos de texto o no
 */
function createPettyRollRichEmbed({
  name,
  picture,
  rollType,
  result,
  calc,
  type,
  showCalc = true
}) {
  const embedResult = new RichEmbed()
    .setAuthor(name, picture, picture)
    .setThumbnail(picture)
    .setFooter(rollType)
    // puedes cambiar esto por makeCode
    .addField(
      'Resultado',
      `\`\`\`autohotkey
${result}
\`\`\``,
      false
    )
  if (type === BLUNDER) {
    embedResult.addField(
      'Pifia de:',
      `\`\`\`
${calc}
\`\`\``,
      false
    )
  } else if (showCalc === true) {
    embedResult.addField(
      'Cálculo',
      `\`\`\`
${calc}
\`\`\``,
      false
    )
  }
  return embedResult
}
// TODO:this to a correct modules, maibe utils and userUtils
module.exports.getVariablesArray = async function getVariablesArray(
  userVariables,
  variables,
  rawResponce
) {
  // If a variable does not exist in userVariables this appear in notInstanciatedVariables
  // get the value of variables in command from userVariables
  variables = variables.map(variable => userVariables[variable.name] || variable.name)
  variables = [...new Set(variables)] // dont repeat variables
  const notInstanciatedVariables = variables.filter(x => isNaN(Number(x)))
  if (notInstanciatedVariables.length > 0) {
    const message = `No has guardado esta(s) variable(s): ${notInstanciatedVariables.join(
      ', '
    )}\nNo puedo calcular la tirada.`
    await rawResponce(message)
    await rawResponce('Si quieres ver los commandos usa ```.h```')
    return null
  }
  return variables
}

module.exports.getUserVariables = async function getUserVariables(user) {
  // TODO: change this firebase interface to a manageusers interface
  let userVariables = await user.child('variables').once('value')
  userVariables = userVariables.val()
  if (userVariables) return userVariables
  return {}
}

module.exports.getToAdd = function getToAdd(calcText, variablesContainer) {
  return Number(mp.parse(calcText !== '' ? calcText : '0').evaluate(variablesContainer))
}
