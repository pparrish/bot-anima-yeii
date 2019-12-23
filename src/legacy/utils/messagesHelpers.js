
// relativo al envio de mensajes
const responceTo = responceFn => toResponce => options =>
  responceFn(options, toResponce)

const rawMessage = responceTo(
  (options, toResponce) => {
    if (typeof options === 'object') {
      let { text, embed } = options
      setTimeout(() => toResponce.channel.send(text, { embed: embed }), 500)
    } else setTimeout(() => toResponce.channel.send(options), 500)
  })

function makeCode (text) {
  return `\`\`\`${text}\`\`\``
}

module.exports = {
  makeCode,
  responceTo,
  rawMessage,
  ...module.exports
}
