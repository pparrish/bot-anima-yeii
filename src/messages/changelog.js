export default {
  name: 'changelog',
  resolver: async (_, { channel }, client) => {
    const updatesChannel = client.guilds
      .find(x => x.id === '560194891942985760')
      .channels.find(x => x.name === 'updates')
    const { lastMessageID } = updatesChannel
    const lastMessage = await updatesChannel.fetchMessage(
      lastMessageID
    )

    return channel.send(lastMessage.content)
  },
}
