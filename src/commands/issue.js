export default ({ message }, _, messenger) => {
  return messenger.send(
    'to issue channel',
    message
  )
}
