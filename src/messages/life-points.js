export const lifeIsNull = {
  name: 'life is null',
  resolver: (sheetName, { channel }) => {
    return channel.send(`La ficha **${sheetName}** no tiene vida asignada, para asignar la vida usa:
\`\`\`
.pv = <valor_de_vida>
\`\`\`
ejemplo: \`.pv = 100\`
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
  name: 'life setted',
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
  name: 'life not points',
  resolver: (_, { channel }) => {
    return channel.send(
      `Necesito un valor para realizar la operación.
ejemplo: \`.pv + 10\`
`
    )
  },
}
