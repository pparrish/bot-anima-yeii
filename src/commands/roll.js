import { Parser } from 'expr-eval'

const mp = new Parser()
mp.consts = {}

function traslateOptions(options) {
  const open = [
    'abierta',
    'abiertas',
    'a',
    'A',
    'open',
    'opens',
    'o',
    'O',
  ]
  const openRequeriment = [
    'rabierta',
    'RAbierta',
    'r',
    'R',
    'ra',
    'rA',
    'Ra',
    'RA',
    'openRequeriment',
    'openrequeriment',
    'or',
    'OR',
  ]
  const blunder = [
    'pifia',
    'p',
    'P',
    'b',
    'B',
    'blunder',
  ]
  const blunderRequeriment = [
    'rpifia',
    'rp',
    'RP',
    'br',
    'BR',
  ]
  const trasltedOptions = {}
  Object.entries(options).map(x => {
    const name = x[0]
    const value = x[1]
    // open
    if (open.indexOf(name) !== -1) {
      trasltedOptions.handleOpen = !!value
    }
    // openRequeriment
    if (openRequeriment.indexOf(name) !== -1) {
      const number = Number(value)
      trasltedOptions.openRequeriment = Number.isNaN(
        number
      )
        ? undefined
        : number
    }
    // bluner
    if (blunder.indexOf(name) !== -1) {
      trasltedOptions.handleBlunder = !!value
    }
    // blundet requirement
    if (blunderRequeriment.indexOf(name) !== -1) {
      const number = Number(value)
      trasltedOptions.blunderRequeriment = Number.isNaN(
        number
      )
        ? undefined
        : number
    }
    return [name, value]
  })
  return trasltedOptions
}

export default (
  ARoller,
  senderCommandName
) => async (
  { options, variables, calc = '' },
  context,
  messenger
) => {
  const userSheet = await context.storage.selectedSheet
  const userVariables = userSheet.variables
  const nonSettedVariables = variables.filter(
    variable => !(variable in userVariables)
  )
  if (nonSettedVariables.length >= 1) {
    messenger.send(
      'non setted variables',
      nonSettedVariables,
      context
    )
    return false
  }

  let toAdd = 0
  try {
    toAdd = Number(
      mp
        .parse(calc === '' ? '0' : calc)
        .evaluate(userVariables)
    )
  } catch (e) {
    messenger.send(
      'raw',
      {
        text: 'No puedo calcular eso.',
      },
      context
    )
    return false
  }

  if (toAdd > 100000) {
    messenger.send('raw', {
      text: `${toAdd}!!!! No, lo siento, no me pagan lo suficiente.`,
      context,
    })
  }

  // a dice must be trowed here dice.roll(options)
  const diceResult = new ARoller(
    traslateOptions(options)
  ).roll()

  messenger.send(
    senderCommandName,
    {
      sheet: userSheet,
      total: diceResult.total + toAdd,
      history: diceResult.history,
      type: diceResult.type,
      calc,
    },
    context
  )

  return true
}
