export const lifeIsNull = {
  name: 'life is null',
  resolver: (sheetName, { channel }) => {
    return channel.send(`La ficha **${sheetName}** no tiene vida asignada, para asignar la vida usa:
\`\`\`
.pv = <valor_de_vida>
\`\`\`
ex. \`.pv = 100\`
`)
  },
}

export const lifeActual = {
  name: 'life actual',
  resolver: (
    { life, selectedSheetName },
    { channel }
  ) => {
    return channel.send(
      `pv de **${selectedSheetName}** = ${life.value}`
    )
  },
}

export const lifeSetted = {
  name: 'Life setted',
  resolver: (
    { selectedSheetName, newLife },
    { channel }
  ) => {
    return channel.send(
      `Los pv de **${selectedSheetName}** son ahora ${newLife.value}`
    )
  },
}

export const lifeNotPoints = {
  name: 'life actual',
  resolver: (_, { channel }) => {
    return channel.send(
      `Necesito un valor para realizar la operación.
ejemplo: \`.pv + 10\`
`
    )
  },
}
