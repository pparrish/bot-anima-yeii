import CommandManager from './command-manager'
import messagesManager from './messages-manager'
import variables from './variables'
import rolls from './rolls'
import damage from './damage'
import initiative from './initiative'
import prefixedValues from './parsers/prefixedValues'
import variablesParser from './parsers/variables'
import calcParser from './parsers/calc'
import first from './parsers/first'
import rest from './parsers/rest'
import issue from './commands/issue'
import tables from './commands/tables'
import help from './commands/help'
import sheets from './sheets'
import tldr from './commands/tldr'
import rollGeneratorType from './commands/roll-generator-type'
// import createCharacter from './commands/create-character'
import cdmCreateACharacter from './clasicos-del-mazmorreo/commands/create-character'
import lifePoints from './commands/life-points'
import testCommand from './commands/test-command'

const parseOptions = {
  name: 'options',
  parser: prefixedValues('?'),
  consume: true,
}
const parseVariables = {
  name: 'variables',
  parser: variablesParser,
  consume: false,
}
const parseCalc = {
  name: 'calc',
  parser: calcParser,
  consume: true,
}

const parseQuerry = {
  name: 'querry',
  parser: rest,
  consume: true,
}
const commands = [
  {
    name: 't',
    resolver: rolls.resolvers.ability,
    options: [
      parseOptions,
      parseVariables,
      parseCalc,
    ],
    description:
      'Tiradas de d100, manejo las pifias y abiertas por ti.',
  },
  {
    name: 'd',
    resolver: rolls.resolvers.characteristic,
    options: [
      parseOptions,
      parseVariables,
      parseCalc,
    ],
    description:
      'Tiradas de d10, manejo las pifias y abiertas por ti.',
  },
  {
    name: 'gv',
    resolver: variables.commands.save,
    options: [
      {
        name: 'name',
        parser: first,
        consume: true,
      },
      {
        name: 'value',
        parser: first,
        consume: true,
      },
    ],
    description:
      'Guarda una variable en la ficha actual del usuario.',
  },
  {
    name: 'bv',
    resolver: variables.commands.erase,
    options: [
      {
        name: 'name',
        parser: first,
        consume: true,
      },
    ],
    description:
      'Borra una variable de tu ficha actual.',
  },
  {
    name: 'issue',
    resolver: issue,
    options: [
      {
        name: 'message',
        parser: rest,
        consume: true,
      },
    ],
    description:
      'Informa de errores al desarrollador.',
  },
  {
    name: 'tb',
    resolver: tables,
    options: [parseQuerry],
    description: 'Muestra las tablas de Anima',
  },
  {
    name: 'h',
    resolver: help,
    options: [
      {
        name: 'command',
        parser: first,
        consume: true,
      },
    ],
    description:
      'Obtén más información sobre el bot y sus comandos',
  },
  {
    name: 'ficha',
    resolver: sheets.resolvers.save,
    options: [
      {
        name: 'force',
        parser: prefixedValues('?'),
        consume: true,
      },
      parseQuerry,
    ],
    description:
      'Crea, guarda o cambia entre tus fichas.',
  },
  {
    name: 'bficha',
    resolver: sheets.resolvers.erase,
    options: [parseQuerry],
    description:
      'Borra la ficha que se le indique',
  },
  {
    name: 'tldr',
    resolver: tldr,
    options: [parseQuerry],
    description:
      'Compendio de reglas resumidas de anima',
  },
  {
    name: 'pv',
    resolver: lifePoints,
    options: [
      {
        name: 'mod',
        parser: first,
        consume: true,
      },
      {
        name: 'points',
        parser: rest,
        consume: true,
      },
    ],
    description:
      'Guarda o modifica tus puntos de vida',
  },
  {
    name: 'generar-tirada-tipo',
    resolver: rollGeneratorType,
    options: [
      {
        name: 'type',
        parser: first,
        consume: true,
      },
    ],
    description:
      'Genera automáticamente las tiradas necesarias para crear un personaje',
  },
  /* {
    name: 'crear-ficha',
    resolver: createCharacter,
    options: [],
  }, */
  {
    name: 'v',
    resolver: (_, context, messenger) => {
      messenger.send(
        'changelog',
        undefined,
        context
      )
    },
    description:
      'Obtén información de las novedades del bot ',
  },
  {
    name: 'cd',
    resolver:
      damage.resolvers.commands.calculateDamage,
    options: [
      {
        name: 'finalAtttack',
        parser: first,
        consume: true,
      },
      {
        name: 'weaponDamage',
        parser: first,
        consume: true,
      },
      {
        name: 'finalDefence',
        parser: first,
        consume: true,
      },
      {
        name: 'armorType',
        parser: first,
        consume: true,
      },
    ],
    description: 'Calcula el daño de un ataque.',
  },
  {
    name: 'i',
    resolver:
      initiative.resolvers.resolveInitiative,
    options: [
      {
        name: 'namesAndTurns',
        parser: prefixedValues(''),
        consume: true,
      },
    ],
    description: 'Calcula la iniciativa.',
  },
  // Clasicos del mazmorreo
  {
    name: 'cdm',
    resolver: cdmCreateACharacter,
    description:
      'Crea personajes nivel 0 del juego Cásicos del Mazmorreo',
  },
]

// test  command
if (process.env.NODE_ENV === 'development')
  commands.push({
    name: 'ts',
    resolver: testCommand,
    options: [],
    Description:
      'Comando para hacer pruebas en el bot, no se supone que deverias verlo.',
  })

export default new CommandManager(commands, {
  prefix: '.',
  messageManager: messagesManager,
})
