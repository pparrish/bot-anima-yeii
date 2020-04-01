export default async function getMessageFromUser(
  messageFilter,
  { id, collectorChannel }
) {
  const filter = message => {
    if (message.author.bot) return false
    if (message.author.id !== id) return false
    return messageFilter(message.content)
  }
  const collected = await collectorChannel.awaitMessages(
    filter,
    { max: 1 }
  )
  return collected.first().content
}
