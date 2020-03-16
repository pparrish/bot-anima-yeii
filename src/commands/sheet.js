import Queue from 'bull'
import searchInNames from '../utils/searchInNames'
import Life from '../anima/life'

require('dotenv').config()

const REDIS_URL =
  process.env.REDIS_URL ||
  'redis://127.0.0.1:6379'

const workQueue = new Queue('work', REDIS_URL)

export default async (
  { querry, options },
  context,
  messenger
) => {
  let selectedSheed = await context.storage
    .selectedSheetName
  // change sheet or search
  if (querry) {
    const sheetNames = await context.storage
      .sheetsList
    const indexQuerry = Number(querry) - 1
    // Querry is a name
    if (Number.isNaN(indexQuerry)) {
      const {
        hardMatch,
        softhMatch,
      } = searchInNames(querry, sheetNames)
      if (hardMatch.length === 1)
        selectedSheed = hardMatch[0].name
      else if (
        softhMatch.length === 1 &&
        !options.f
      ) {
        // Here whe need maibe send the sheet related
        selectedSheed = softhMatch[0].name
      } else selectedSheed = querry
    } else {
      selectedSheed = sheetNames[indexQuerry]
      if (!selectedSheed) {
        return messenger.send(
          'sheet not exist',
          { index: indexQuerry, sheetNames },
          context
        )
      }
    }
  }
  const firstAttachment = context.attachments?.first()

  if (!firstAttachment) {
    // no attachnent no querry is send sheets
    if (!querry) {
      return messenger.send(
        'sheet list',
        undefined,
        context
      )
    }
    // No atqchment and querry is a change sheet
    // eslint-disable-next-line no-param-reassign
    context.storage.selectedSheetName = selectedSheed
    return messenger.send(
      'sheet change',
      selectedSheed,
      context
    )
  }
  const { filename } = firstAttachment
  const isExelRecibed =
    filename?.split('.')?.pop() === 'xlsm'
  let isImageRecibed =
    filename?.split('.').pop() === 'jpg'
  isImageRecibed =
    isImageRecibed ||
    filename?.split('.').pop() === 'png'

  // eslint-disable-next-line no-param-reassign
  context.storage.selectedSheedName = selectedSheed

  if (isImageRecibed) {
    // eslint-disable-next-line no-param-reassign
    context.storage.avatar = firstAttachment.url
    return messenger.send(
      'sheet avatar change',
      selectedSheed,
      context
    )
  }
  if (isExelRecibed) {
    messenger.send(
      'sheet proccessing',
      undefined,
      context
    )
    let job
    try {
      // read the exel
      job = await workQueue.add({
        url: firstAttachment.url,
      })
      const sheet = await job.finished()
      // eslint-disable-next-line no-param-reassign
      context.storage.variables = sheet.variables
      if (sheet.data.life !== undefined)
        // eslint-disable-next-line no-param-reassign
        context.storage.life = new Life(
          sheet.data.life
        )
      return messenger.send(
        'sheet proccesed',
        selectedSheed,
        context
      )
    } catch (e) {
      messenger.send(
        'raw',
        {
          text:
            'Hubo un problema al procesar la ficha, el error ya ha sido indormado.',
        },
        context
      )
      return messenger.send(
        'to issue channel',
        e.message
      )
    }
  }
  return messenger.send(
    'sheet bad attachment',
    filename,
    context
  )
}
