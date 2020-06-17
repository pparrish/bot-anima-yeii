import {
  notNumberVariable,
  variableSaved,
  variableNotFound,
  variable,
  notFoundVariables,
  allVariables,
  deletedVariable,
} from './messages'
import save from './saveCommand'
import erase from './eraseCommand'

export default {
  messages: [
    notNumberVariable,
    variableSaved,
    variableNotFound,
    variable,
    notFoundVariables,
    allVariables,
    deletedVariable,
  ],
  commands: {
    save,
    erase,
  },
}
