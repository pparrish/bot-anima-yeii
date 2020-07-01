import CommandManager from './command-manager'
import messagesManager from './messages-manager'
import variables from './variables'
import damage from './damage'
import prefixedValues from './parsers/prefixedValues'
import variablesParser from './parsers/variables'
import calcParser from './parsers/calc'
import rollResolver from './commands/roll'
import AbilityDice from './dices/AbilityDice'
import CharacteristicDice from './dices/CharacteristicDice'
import first from './parsers/first'
import rest from './parsers/rest'
import issue from './commands/issue'
import tables from './commands/tables'
import help from './commands/help'
import sheets from './sheets'
import tldr from './commands/tldr'
import rollGeneratorType from './commands/roll-generator-type'
import createCharacter from './commands/create-character'
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
    resolver: rollResolver(AbilityDice, 'roll'),
    options: [
      parseOptions,
      parseVariables,
      parseCalc,
    ],
  },
  {
    name: 'd',
    resolver: rollResolver(
      CharacteristicDice,
      'ability roll'
    ),
    options: [
      parseOptions,
      parseVariables,
      parseCalc,
    ],
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
  },
  {
    name: 'issue###',
    resolver: issue,
    options: [
      {
        name: 'message',
        parser: rest,
        consume: true,
      },
    ],
  },
  {
    name: 'tb',
    resolver: tables,
    options: [parseQuerry],
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
  },
  {
    name: 'ficha',
    resolver: sheets.resolvers.save,
    options: [parseOptions, parseQuerry],
  },
  {
    name: 'bficha',
    resolver: sheets.resolvers.erase,
    options: [parseQuerry],
  },
  {
    name: 'tldr',
    resolver: tldr,
    options: [parseQuerry],
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
  },
  {
    name: 'crear-ficha',
    resolver: createCharacter,
    options: [],
  },
  {
    name: 'v',
    resolver: (_, context, messenger) => {
      messenger.send(
        'changelog',
        undefined,
        context
      )
    },
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
  },
  // Clasicos del mazmorreo
  {
    name: 'cdm',
    resolver: cdmCreateACharacter,
    options: [],
  },
]

// test  command
if (process.env.NODE_ENV === 'development')
  commands.push({
    name: 'ts',
    resolver: testCommand,
    options: [],
  })

export default new CommandManager(commands, {
  prefix: '.',
  messageManager: messagesManager,
})
