export default class MessageManager {
  constructor(messageTypes, messenger) {
    this.messenger = messenger
    this.messagesTypes = {}
    if (Array.isArray(messageTypes))
      this.addMessagesTypesFromArray(messageTypes)
  }

  addMessagesTypesFromArray(messageTypes) {
    messageTypes.map(messageType =>
      this.addMessageType(messageType)
    )
    return this
  }

  addMessageType(messageType) {
    this.messagesTypes[
      messageType.name
    ] = messageType
    return this
  }

  send(type, payload, context) {
    if (!(type in this.messagesTypes))
      return false
    const message = this.messagesTypes[type]
    message.resolver(
      payload,
      context,
      this.messenger
    )
    if (Math.random() * 100 <= 1)
      this.send(
        'raw',
        {
          text:
            'Usa `.h` para conocer más comandos',
        },
        context
      )
    return this
  }
}
