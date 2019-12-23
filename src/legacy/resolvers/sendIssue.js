// TODO  document this
module.exports = async function sendIssue ({ message }, { client }) {
  await client.guilds.find(x => x.id === '560194891942985760').channels.find(x => x.name === 'issues').send(message)
}
