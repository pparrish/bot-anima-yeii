import roll from './roll'
import abilityRoll from './ability-roll'
import {
  notNumberVariable,
  variableSaved,
  variableNotFound,
  variable,
  notFoundVariables,
  allVariables,
  deletedVariable,
} from './variables'
import issue from './issue'
import {
  table,
  allTables,
  tableNotFound,
  tableNotExist,
} from './tables'
import {
  sheetNotExist,
  sheetList,
  sheetChange,
  sheetAvatarChange,
  sheetProccessing,
  sheetProccesed,
  sheetBadAttachment,
  sheetDeleted,
} from './sheet'
import cdmCharacter from '../clasicos-del-mazmorreo/messages/character'
import {
  tldr,
  tldrAll,
  tldrNitFound,
  tldrNotExist,
} from './tldr'
import rollGeneratorType from './roll-generator-type'
import {
  lifeActual,
  lifeIsNull,
  lifeSetted,
  lifeNotPoints,
} from './life-points'

import help from './help'

export default [
  {
    name: 'raw',
    resolver: ({ text = '' }, { channel }) => {
      if (text)
        return channel.send(text, {
          split: true,
        })
      return false
    },
  },
  {
    name: 'non setted variables',
    resolver: (
      nonSettedVariables,
      { channel }
    ) => {
      channel.send(`No he podido encontrar esta${
        nonSettedVariables.length > 1 ? 's' : ''
      } habilidad${
        nonSettedVariables.length > 1 ? 'es' : ''
      }: ${nonSettedVariables}
Usa \`.gv\` para ver todas tus habilidades guardadas.
`)
    },
  },
  roll,
  abilityRoll,
  notNumberVariable,
  variableNotFound,
  variableSaved,
  variable,
  notFoundVariables,
  allVariables,
  deletedVariable,
  issue,
  table,
  allTables,
  tableNotExist,
  tableNotFound,
  sheetNotExist,
  sheetList,
  sheetChange,
  sheetAvatarChange,
  sheetProccessing,
  sheetProccesed,
  sheetBadAttachment,
  sheetDeleted,
  cdmCharacter,
  tldr,
  tldrAll,
  tldrNitFound,
  tldrNotExist,
  rollGeneratorType,
  lifeActual,
  lifeIsNull,
  lifeSetted,
  lifeNotPoints,
  help,
]
