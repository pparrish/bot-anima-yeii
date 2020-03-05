import tlrds from '../tldr/tlrds'

export const tldr = {
  name: 'tldr',
  resolver: (index, { channel }) => {
    return channel.send(
      `**${tlrds[index].name}**
=======================================
${tlrds[index].body}
`
    )
  },
}

export const tldrNotExist = {
  name: 'tldr not exist',
  resolver: (
    { index, tldrsNames },
    { channel }
  ) => {
    return channel.send(`El tldr número ${index +
      1} no existe.
Estos son todos los tldr.
    ${tldrsNames.reduce(
      (acc, name, i) =>
        `${acc}\n${i + 1} : ${name}`,
      ''
    )}
`)
  },
}

export const tldrAll = {
  name: 'tldr all',
  resolver: (_, { channel }) => {
    return channel.send(`Estos son todos los tldr.
    ${tlrds.reduce(
      (acc, t, i) =>
        `${acc}\n${i + 1} : ${t.name}`,
      ''
    )}
`)
  },
}

export const tldrNitFound = {
  name: 'tldr not found',
  resolver: ({ matchs, querry }, { channel }) => {
    return channel.send(`Resultados relacionados con \`${querry}\`
${matchs.reduce(
  (acc, aTldr) =>
    `${acc}\n${aTldr.index}: ${aTldr.name}`,
  ''
)}${
      matchs.length === 0
        ? 'Ningún resultado.'
        : ''
    }
`)
  },
}
