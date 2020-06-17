import {
  sheetNotExist,
  sheetList,
  sheetChange,
  sheetAvatarChange,
  sheetProccessing,
  sheetProccesed,
  sheetBadAttachment,
  sheetDeleted,
} from './messages'
import save from './saveResolver'
import erase from './eraseResolver'

export default {
  messages: [
    sheetNotExist,
    sheetList,
    sheetChange,
    sheetAvatarChange,
    sheetProccesed,
    sheetProccessing,
    sheetBadAttachment,
    sheetDeleted,
  ],
  resolvers: {
    save,
    erase,
  },
}
