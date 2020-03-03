export default async (
  { name },
  context,
  messenger
) => {
  const {
    success,
    selectedSheet,
  } = await context.storage.deleteVariable(name)
  if (!success)
    return messenger.send(
      'variable not found',
      { name, selectedSheet },
      context
    )
  return messenger.send(
    'variable deleted',
    { name, selectedSheet },
    context
  )
}
