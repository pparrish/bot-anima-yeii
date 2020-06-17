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

// Caracteristicas
const characteristicNames = [
  'fuerza',
  'destreza',
  'inteligencia',
  'percepción',
  'agilidad',
  'poder',
  'constitución',
  'voluntad',
]
// Primarias
const primaryNames = [
  'ataque',
  'parada',
  'esquiva',
  'mágica',
  'psíquica',
  'potencial',
  'convocar',
  'atadura',
  'dominación',
  'desconvocar',
]
// Secundarias
const secondaryNames = [
  'acrobacias',
  'advertir',
  'alquimia',
  'animales',
  'animismo',
  'arte',
  'atletismo',
  'baile',
  'buscar',
  'caligrafíaritual',
  'callejeo',
  'cerrajería',
  'ciencia',
  'comercio',
  'confección',
  'confmarionetas',
  'disfraz',
  'estilo',
  'etiqueta',
  'forja',
  'frialdad',
  'herbolaria',
  'historia',
  'intimidar',
  'ley',
  'liderazgo',
  'medicina',
  'memorizar',
  'montar',
  'música',
  'nadar',
  'navegación',
  'ocultarse',
  'ocultismo',
  'orfebrería',
  'persuasión',
  'pfuerza',
  'pilotar',
  'rastrear',
  'resdolor',
  'robo',
  'runas',
  'saltar',
  'sigilo',
  'tactica',
  'tasación',
  'tmanos',
  'trampería',
  'trepar',
  'venenos',
  'vmágica',
]
export const allVariables = {
  name: 'all variables',
  resolver: (
    { variables, selectedSheet },
    { channel }
  ) => {
    const characteristics = {
      have: false,
      str:
        '\\_\\_\\_\\_\n**Características\n==============================**',
    }
    const primary = {
      have: false,
      str:
        '\\_\\_\\_\\_\n**Primarías\n==============================**',
    }
    const secondary = {
      have: false,
      str:
        '\\_\\_\\_\\_\n**Secundarías\n==============================**',
    }
    const another = {
      have: false,
      str:
        '\\_\\_\\_\\_\n**Variables\n==============================**',
    }

    // eslint-disable-next-line no-shadow
    Object.entries(variables).map(variable => {
      if (
        characteristicNames.includes(variable[0])
      ) {
        characteristics.have = true
        characteristics.str += `\n**${variable[0]}** = ${variable[1]}`
        return false
      }
      if (primaryNames.includes(variable[0])) {
        primary.have = true
        primary.str += `\n**${variable[0]}** = ${variable[1]}`
        return false
      }
      if (secondaryNames.includes(variable[0])) {
        secondary.have = true
        secondary.str += `\n**${variable[0]}** = ${variable[1]}`
        return false
      }
      another.have = true
      another.str += `\n**${variable[0]}** = ${variable[1]}`
      return false
    })

    channel.send(
      `Variables guardadas en **${selectedSheet}**
${characteristics.have ? characteristics.str : ''}
${primary.have ? primary.str : ''}
${secondary.have ? secondary.str : ''}
${another.have ? another.str : ''}
`
    )
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
