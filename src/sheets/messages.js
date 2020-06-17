export const sheetNotExist = {
  name: 'sheet not exist',
  resolver: async (
    { index, sheetNames },
    { channel, storage }
  ) => {
    const selectedSheed = await storage.selectedSheetName
    const sheetsList = sheetNames.reduce(
      (list, sheet, aIndex) => `${list}
${aIndex + 1} : ${sheet} ${
        sheet === selectedSheed ? '*' : ''
      }`,
      ''
    )

    channel.send(
      `La ficha número **${index}** no existe.
Estas son las fichas que tienes guardadas:
${sheetsList}

Usa \`.ficha <número>\` para cambiar de ficha.`,
      { split: true }
    )
  },
}

export const sheetList = {
  name: 'sheet list',
  resolver: async (_, { channel, storage }) => {
    const selectedSheed = await storage.selectedSheetName
    const sheetsList = (
      await storage.sheetsList
    ).reduce(
      (list, sheet, index) => `${list}
${index + 1} : ${sheet} ${
        sheet === selectedSheed ? '*' : ''
      }`,
      ''
    )

    channel.send(
      `Estas son las fichas que tienes guardadas:
${sheetsList}

Usa \`.ficha <número>\` para cambiar de ficha.`,
      { split: true }
    )
  },
}

export const sheetChange = {
  name: 'sheet change',
  resolver: (sheetName, { channel }) => {
    channel.send(`Ficha cambiada a **${sheetName}**
Usa \`.gv\` para ver todas las variables dentro de la ficha`)
  },
}

export const sheetAvatarChange = {
  name: 'sheet avatar change',
  resolver: (sheetName, { channel }) => {
    channel.send(
      `Imagen de la ficha **${sheetName}** cambiada.`
    )
  },
}

export const sheetProccessing = {
  name: 'sheet proccessing',
  resolver: (_, { channel }) => {
    channel.send(
      `Procesando ficha, las variables guardadas anteriormente serán borradas. `
    )
  },
}
export const sheetProccesed = {
  name: 'sheet proccesed',
  resolver: (sheetName, { channel }) => {
    channel.send(`Ficha **${sheetName}** procesada: 
Usa \`.gv\` para ver todas las variables dentro de la ficha`)
  },
}

export const sheetBadAttachment = {
  name: 'sheet bad attachment',
  resolver: (filename, { channel }) => {
    channel.send(
      `Error al procesar: ${filename}
Solamente admito los siguientes formatos: png jpg xlms (ficha de anima)`
    )
  },
}

export const sheetDeleted = {
  name: 'sheet deleted',
  resolver: (sheetName, { channel }) => {
    channel.send(
      `La ficha **${sheetName}** ha sido ${
        sheetName === 'default'
          ? 'limpiada'
          : 'borrada'
      }`
    )
  },
}
