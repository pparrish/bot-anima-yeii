import { RichEmbed, Attachment } from 'discord.js'
import fetch from 'node-fetch'

export default {
  name: 'roll',
  resolver: async (
    { sheet, total, history, type, calc, facepalm=true },
    { channel, author }
  ) => {
    const rich = new RichEmbed()
    rich
      .setTitle(
        sheet.name === 'default'
          ? author.username
          : sheet.name
      )
      .setThumbnail(
        sheet.avatar
          ? sheet.avatar
          : author.avatarURL
      )
      .addField(
        'Resultado',
        `\`\`\`${total}\`\`\``
      )
      .setFooter(
        '\n_______________________________________'
      )

    let descriptionText = ''
    let color = ''
    if (type === 'open') {
      color = '#ffff00'
      descriptionText = `tirada con ${history.length -
        1} abierta${
        history.length > 2 ? 's' : ''
      }`
    }
    if (type === 'normal') {
      descriptionText = 'tirada normal'
      color = '#0000FF'
    }
    if (type === 'blunder') {
      if (
        history[0] === 1 &&
        history[1] === 100 &&
        facepalm === true
      ) {
        const sendfacepalm = async () => {
          let facepalms = await fetch(
            'https://api.giphy.com/v1/gifs/random?api_key=ZWii62bFm3s2CcYcQYeTbqOa0Bpc1aTq&tag=facepalm&rating=G'
          )
          facepalms = await facepalms.json()
          facepalms =
            facepalms.data.images.downsized.url

          channel.send(new Attachment(facepalms))
        }

        setTimeout(() => {
          sendfacepalm()
          setTimeout(sendfacepalm, 1000)
          setTimeout(sendfacepalm, 60 * 1000)
        }, 1000)
      }
      descriptionText = `pifia de ${history[0]}`
      history.shift()
      color = '#ff0000'
    }

    if (type !== 'blunder') {
      let calcStr = ` + ${calc}`

      if (
        calc.startsWith('+') ||
        calc.startsWith('-')
      )
        calcStr = ` ${calc}`

      if (calc === '') calcStr = ''

      rich.addField(
        'Cálculo',
        `\`\`\`${history.join(
          ' + '
        )}${calcStr}\`\`\``
      )
    }

    rich
      .setDescription(descriptionText)
      .setColor(color)

    channel.send(author, rich)
  },
}
