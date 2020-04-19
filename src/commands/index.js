import prefixedValues from '../parsers/prefixedValues'
import variablesParser from '../parsers/variables'
import calcParser from '../parsers/calc'
import rollResolver from './roll'
import AbilityDice from '../dices/AbilityDice'
import CharacteristicDice from '../dices/CharacteristicDice'
import variables from './variables'
import first from '../parsers/first'
import deleteVariable from './deleteVariable'
import rest from '../parsers/rest'
import issue from './issue'
import tables from './tables'
import help from './help'
import sheet from './sheet'
import deleteSheet from './deleteSheet'
import tldr from './tldr'
import rollGeneratorType from './roll-generator-type'
import createCharacter from './create-character'
import cdmCreateACharacter from '../clasicos-del-mazmorreo/commands/create-character'
import testCommand from './test-command'

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
    resolver: variables,
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
    resolver: deleteVariable,
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
    resolver: sheet,
    options: [parseOptions, parseQuerry],
  },
  {
    name: 'bficha',
    resolver: deleteSheet,
    options: [parseQuerry],
  },
  {
    name: 'tldr',
    resolver: tldr,
    options: [parseQuerry],
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

export default commands
