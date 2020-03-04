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
import cdmCreateACharacter from '../clasicos-del-mazmorreo/commands/create-character'

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

export default [
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
    options: [
      {
        name: 'querry',
        parser: rest,
        consume: true,
      },
    ],
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
    options: [
      parseOptions,
      {
        name: 'querry',
        parser: rest,
        consume: true,
      },
    ],
  },
  {
    name: 'bficha',
    resolver: deleteSheet,
    options: [
      {
        name: 'querry',
        parser: rest,
        consume: true,
      },
    ],
  },
  {
    name: 'cdm',
    resolver: cdmCreateACharacter,
    options: [],
  },
]
