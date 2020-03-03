export const notNumberVariable = {
  name: 'not number variable',
  resolver: (_, { channel }) => {
    channel.send(`El valor debe de ser un número. 
\`\`\`
.gv nombre <número>
\`\`\`
`)
  },
}

export const variableSaved = {
  name: 'variable saved',
  resolver: ({ name, value }, { channel }) => {
    channel.send(`Guardado:
\`\`\`
${name} = ${value}
\`\`\`
`)
  },
}

export const variableNotFound = {
  name: 'variable not found',
  resolver: (
    { name, selectedSheet },
    { channel }
  ) => {
    channel.send(
      `no logre encontrar **${name}** en **${selectedSheet}**`
    )
  },
}

export const variable = {
  name: 'variable',
  resolver: (
    { name, value, selectedSheet },
    { channel }
  ) => {
    channel.send(`Este es el valor en la ficha **${selectedSheet}**
\`\`\`
${name} = ${value}
\`\`\`
`)
  },
}

export const notFoundVariables = {
  name: 'not found variables',
  resolver: (selectedSheet, { channel }) => {
    channel.send(`No pude encontrar ningún valor en la ficha **${selectedSheet}**
Para guardar valores en la ficha puedes usar este comando:
\`\`\`
.gv nombre valor
\`\`\`
O puedes subir una ficha de anima entera con
\`\`\`
.ficha || Adjuntar en el mensaje la ficha.
\`\`\`
`)
  },
}

export const allVariables = {
  name: 'all variables',
  resolver: (
    { variables, selectedSheet },
    { channel }
  ) => {
    const variablesStr = Object.entries(
      variables
    ).reduce(
      (accStr, v) =>
        `${accStr}**${v[0]}** = ${v[1]}\n`,
      ''
    )
    channel.send(`Variables guardadas en **${selectedSheet}**
${variablesStr}`)
  },
}

export const deletedVariable = {
  name: 'variable deleted',
  resolver: (
    { name, selectedSheet },
    { channel }
  ) => {
    channel.send(
      `Borrado **${name}** de **${selectedSheet}**`
    )
  },
}
