import { RichEmbed } from 'discord.js'

const RESULT_TITLES = {
  'type 1': 'Tipo I',
  'type 2': 'Tipo II',
  'type 3': 'Tipo III',
  'type 4': 'Tipo IV',
}
const RESULT_MODE = {
  values: 'Resultados:',
  points: 'Puntos:',
}
const TYPE_RULES = {
  'type 1':
    'Azar con ventaja : Se tiran 8 d10 repitiendo si sale 1, 2 o 3, al final se reemplaza el menor resultado por un 9.',
  'type 2':
    'Azar con riesgo: Se tiran 8 pares de d10 y de cada par se elije el mayor resultado.',
  'type 3':
    'Totalmente al azar: Se tiran 8d10  simplemente.',
  'type 4':
    'Puntos al azar: Se tiran 7d10, y se suman los resultados.',
}

export default {
  name: 'roll-generator-type',
  resolver: (
    {
      type,
      mode,
      points,
      history,
      replaced,
      replacedIndex,
    },
    { channel, author }
  ) => {
    let type4pointsCount = 0
    const historyStr = history.reduce(
      (acc, dices, index) => {
        type4pointsCount += dices
        if (
          points[index] &&
          !Array.isArray(dices)
        )
          return `${acc}
${index + 1}: \`${dices}\``
        return `${acc}
${index + 1}: \`${dices} => ${
          replacedIndex === index
            ? `${replaced} reemplazado por `
            : ''
        }${
          points[index]
            ? points[index]
            : type4pointsCount
        }\``
      },
      ''
    )
    const rich = new RichEmbed()
      .setTitle(
        `Generación de tiradas: ${RESULT_TITLES[type]}
+ + + + + + + + + + + + + + + + + + + + +`
      )
      .addField(
        RESULT_MODE[mode],
        `\`\`\`${points}\`\`\``
      )
      .addField('🎲 Tiradas:', historyStr)
      .setFooter(TYPE_RULES[type])
    channel.send(author, rich)
  },
}
