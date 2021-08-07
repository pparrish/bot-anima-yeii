export default {
  name: 'to issue channel',
  resolver: (message, _, client) => {
    if (!message) return false
    client.guilds.cache
      .find((x) => x.id === '560194891942985760')
      .channels.cache.find(
        (x) => x.name === 'issues'
      )
      .send(message)
    return true
  },
}
