export default {
  name: 'to issue channel',
  resolver: (message, _, client) => {
    if (!message) return false
    client.guilds
      .find(x => x.id === '560194891942985760')
      .channels.find(x => x.name === 'issues')
      .send(message)
    return true
  },
}
