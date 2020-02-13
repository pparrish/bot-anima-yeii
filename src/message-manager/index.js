export default class MessageManager {
  constructor(messageTypes, messenger) {
    this.messenger = messenger
    this.messagesTypes = {}
    if (Array.isArray(messageTypes))
      this.addMessagesTypesFromArray(messageTypes)
  }

  addMessagesTypesFromArray(messageTypes) {
    messageTypes.map(this.addMessageType)
    return this
  }

  addMessageType(messageType) {
    this.messageTypes[
      messageType.name
    ] = messageType
    return this
  }

  send(type, payload, context) {
    if (!(type in this.messageTypes)) return false
    const message = this.messagesTypes[type]
    message(this.messenger, payload, context)
    return this
  }
}
