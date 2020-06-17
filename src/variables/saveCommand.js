const saveVariable = (
  name,
  aValue,
  context,
  messenger
) => {
  // do stuff for the variable
  const value = Number(aValue)
  if (Number.isNaN(value)) {
    messenger.send(
      'not number variable',
      null,
      context
    )
    return false
  }
  // save the value
  context.storage.saveVariable(name, value)
  // send message
  messenger.send(
    'variable saved',
    { name, value },
    context
  )
  return true
}
const showVariable = async (
  name,
  context,
  messenger
) => {
  // get the variable
  const {
    selectedSheet,
    value,
  } = await context.storage.getVariable(name)
  // send if not exist
  if (!value) {
    messenger.send(
      'variable not found',
      { name, selectedSheet },
      context
    )
    return false
  }
  // sent a mensaje if  exist
  messenger.send(
    'variable',
    { name, value, selectedSheet },
    context
  )
  return true
}
const showAllVariables = async (
  context,
  messenger
) => {
  // get all variables
  const {
    variables,
    selectedSheet,
  } = await context.storage.getVariables()
  if (Object.entries(variables).length === 0) {
    messenger.send(
      'not found variables',
      selectedSheet,
      context
    )
    return false
  }
  messenger.send(
    'all variables',
    { variables, selectedSheet },
    context
  )
  return true
}

export default (
  { name, value },
  context,
  messenger
) => {
  if (name && value)
    return saveVariable(
      name,
      value,
      context,
      messenger
    )
  if (name && !value)
    return showVariable(name, context, messenger)
  if (!name && !value)
    return showAllVariables(context, messenger)
  return false
}
