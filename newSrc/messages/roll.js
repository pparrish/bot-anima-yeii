import { RichEmbed } from 'discord.js'

export default {
  name: 'roll',
  resolver: (payload, { channel }) => {
    const ritch = {
      author: {
        name: 'Parrish',
      },
      thumbnail: {
        url:
          'https://cdn.discordapp.com/attachments/571852586588700674/675566733431406612/waifu-1.png',
      },
      fields: [
        {
          name: 'Resultado',
          value: '```5```',
        },
        {
          name: 'Cálculo',
          value: '```x xx xx```',
        },
      ],
      footer: {
        text: 'Tirada normal',
      },
    }
    channel.send(new RichEmbed(ritch))
  },
}
