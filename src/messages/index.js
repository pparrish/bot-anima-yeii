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

export default [
  {
    name: 'raw',
    resolver: ({ text = '' }, { channel }) => {
      if (text)
        channel.send(text, { split: true })
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
]
