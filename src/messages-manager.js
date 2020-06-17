import MessageManager from './message-manager'
import bot from './bot'
import roll from './messages/roll'
import abilityRoll from './messages/ability-roll'
import changelog from './messages/changelog'
import variables from './variables'
import issue from './messages/issue'
import {
  table,
  allTables,
  tableNotFound,
  tableNotExist,
} from './messages/tables'
import {
  sheetNotExist,
  sheetList,
  sheetChange,
  sheetAvatarChange,
  sheetProccessing,
  sheetProccesed,
  sheetBadAttachment,
  sheetDeleted,
} from './messages/sheet'
import cdmCharacter from './clasicos-del-mazmorreo/messages/character'
import {
  tldr,
  tldrAll,
  tldrNitFound,
  tldrNotExist,
} from './messages/tldr'
import rollGeneratorType from './messages/roll-generator-type'
import {
  lifeActual,
  lifeIsNull,
  lifeSetted,
  lifeNotPoints,
} from './messages/life-points'

import help from './messages/help'

const messages = [
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
  changelog,
  ...variables.messages,
]

export default new MessageManager(
  messages,
  bot.client
)
