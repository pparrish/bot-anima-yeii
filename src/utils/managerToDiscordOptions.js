const optionsTranslation = {
  variables: {
    name: 'calc',
    type: 'STRING',
    description:
      'Agrega valores al resultado o usa variables',
    required: false,
  },
  calc: {
    name: 'calc',
    type: 'STRING',
    description:
      'Agrega valores al resultado o usa variables',
    required: false,
  },
  name: {
    name: 'nombre',
    type: 'STRING',
    description: 'El nombre la variable',
  },
  value: {
    name: 'valor',
    type: 'NUMBER',
    description: 'El valor de la variable',
  },
  message: {
    name: 'mensaje',
    type: 'STRING',
    description:
      'Explica cual es el error y como sucedido',
    required: true,
  },
  querry: {
    name: 'busqueda',
    type: 'STRING',
    description:
      'Escribe las palabras clave o un número que corresponda con tu búsqueda ',
  },
  force: {
    name: 'forzar',
    type: 'BOOLEAN',
    description:
      'Pon en true forzar la creacion de la ficha',
  },
  command: {
    name: 'commando',
    type: 'STRING',
    description:
      'Escribe el comando del cual quieras conocer una descripcion mas detallada',
    required: false,
    choices: [
      { name: 'borrar ficha', value: 'bficha' },
      { name: 'borrar variable', value: 'bv' },
      { name: 'calcular daño', value: 'cd' },
      { name: 'd10', value: 'd' },
      { name: 'ficha', value: 'ficha' },
      { name: 'guardar variable', value: 'gv' },
      { name: 'iniciativa', value: 'i' },
      { name: 'issue', value: 'issue' },
      { name: 'otros', value: 'otros' },
      { name: 'puntos de vida', value: '´pv' },
      { name: 'd100', value: '´t' },
      { name: 'tablas', value: '´tb' },
      { name: 'tldr', value: '´tldr' },
    ],
  },
  mod: {
    name: 'modificador',
    type: 'STRING',
    description:
      'La operación que quieres realizar con tus puntos de vida',
    required: false,
    choices: [
      { name: 'Sustituir', value: '=' },
      { name: 'Sumar', value: '+' },
      { name: 'Restar', value: '-' },
      { name: 'Porcentaje', value: '%' },
      { name: 'Sumar porcentaje', value: '+%' },
      { name: 'Restar porcentaje', value: '-%' },
    ],
  },
  points: {
    name: 'puntos',
    type: 'STRING',
    description:
      'el valor de la modificación a los puntos de vida',
    required: false,
  },
  type: {
    name: 'tipo',
    type: 'STRING',
    description:
      'El tipo de generación que quieras para tus tiradas',
    required: false,
    choices: [
      {
        name: 'Ventaja: Se tiran 8 d10 repitiendo si sale 1,2 o 3, reemplaza el menor resultado por un 9',
        value: '1',
      },
      {
        name: 'Riesgo: Se tiran 8 pares de d10 y de cada par se elige el mayor resultado.',
        value: '2',
      },
      {
        name: 'Totalmente al azar: Se tiran 8d10  simplemente.',
        value: '3',
      },
      {
        name: 'Puntos al azar: Se tiran 7d10, y se suman los resultados.',
        value: '4',
      },
    ],
  },
  finalAtttack: {
    name: 'ataque',
    type: 'NUMBER',
    description:
      'Ataque final con sus modificadores.',
  },
  weaponDamage: {
    name: 'daño',
    type: 'NUMBER',
    description: 'Daño del arma.',
  },
  finalDefence: {
    name: 'defensa',
    type: 'NUMBER',
    description:
      'Defensa final con sus modificadores.',
  },
  armorType: {
    name: 'ta',
    type: 'NUMBER',
    description: 'Tipo de armadura.',
  },
}

const aceptedDiceOptions = [
  {
    name: 'abierta',
    type: 'BOOLEAN',
    description:
      'Decide si tu tirada tiene abiertas',
    required: false,
  },
  {
    name: 'rabierta',
    type: 'NUMBER',
    description:
      'El valor requerido para sacar una abierta',
    required: false,
  },
  {
    name: 'pifia',
    type: 'BOOLEAN',
    description:
      'Decide si tu tierada tiene pifias',
    required: false,
  },
  {
    name: 'rpifia',
    type: 'NUMBER',
    description:
      'El valor requerido para sacar una pifia',
    required: false,
  },
]

function translateOptions(options) {
  return options.reduce(
    (optionsArray, option) => {
      if (option.name === 'options')
        return [
          ...aceptedDiceOptions,
          ...optionsArray,
        ]
      if (!optionsTranslation?.[option.name])
        return optionsArray
      if (
        optionsArray.some(
          (aOption) =>
            aOption.name ===
            optionsTranslation[option.name].name
        )
      )
        return optionsArray

      return [
        optionsTranslation[option.name],
        ...optionsArray,
      ]
    },
    []
  )
}

export default function managerToDiscordOptions(
  commands
) {
  // noinspection JSCheckFunctionSignatures
  return Object.keys(commands).map(
    (commandName) => ({
      name: commandName,
      description:
        commands[commandName].description ??
        'Insert description',
      options: !commands[commandName].options
        ? undefined
        : translateOptions(
            commands[commandName].options
          ),
    })
  )
}
