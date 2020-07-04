import calculateStrWithVariables from './calculateStringWithVariables'

// eslint-disable-next-line import/prefer-default-export
export default async function getCalculationWithUserVariables(
  calc,
  variables,
  context,
  messenger
) {
  const userSheet = await context.storage
    .selectedSheet
  const userVariables = userSheet.variables
  let toAdd
  try {
    toAdd = calculateStrWithVariables(
      calc,
      userVariables,
      variables
    )
  } catch (e) {
    if (e.message === 'variables not setted') {
      messenger.send(
        'non setted variables',
        e.nonSettedVariables,
        context
      )
    }
    if (e.message === 'parse error') {
      messenger.send(
        'raw',
        {
          text: `No puedo calcular: ${calc}`,
        },
        context
      )
    }
    if (e.message === 'big number') {
      messenger.send(
        'raw',
        {
          text: `${e.toAdd}!! ese es un número muy grande, no me pagan lo suficiente.`,
        },
        context
      )
    }
    return false
  }
  return toAdd
}
