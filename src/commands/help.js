export default (
  { command },
  context,
  messenger
) => {
  if (command === 't')
    return messenger.send('help', 't', context)
  if (command === 'd')
    return messenger.send('help', 'd', context)
  if (command === 'tb')
    return messenger.send('help', 'tb', context)
  if (command === 'tldr')
    return messenger.send('help', 'tldr', context)
  if (command === 'gv')
    return messenger.send('help', 'gv', context)
  if (command === 'bv')
    return messenger.send('help', 'bv', context)
  if (command === 'issue###')
    return messenger.send(
      'help',
      'issue',
      context
    )
  if (command === 'ficha')
    return messenger.send(
      'help',
      'ficha',
      context
    )
  if (command === 'bficha')
    return messenger.send(
      'help',
      'bficha',
      context
    )
  if (command === 'pv')
    return messenger.send('help', 'pv', context)
  if (command === 'otros')
    return messenger.send(
      'help',
      'otros',
      context
    )
  return messenger.send(
    'help',
    undefined,
    context
  )
}
