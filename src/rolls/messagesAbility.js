import { RichEmbed } from 'discord.js'

export default {
  name: 'ability roll',
  resolver: async (
    { sheet, total, history, type, calc },
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
      descriptionText = `tirada abierta`
    }
    if (type === 'normal') {
      descriptionText = 'tirada normal'
      color = '#0000FF'
    }
    if (type === 'blunder') {
      descriptionText = `pifia`
      color = '#ff0000'
    }

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

    rich
      .setDescription(descriptionText)
      .setColor(color)

    channel.send(author, rich)
  },
}
