export default async (
  { querry },
  context,
  messenger
) => {
  const selectedSheetName = await context.storage
    .selectedSheetName
  const sheetsList = await context.storage
    .sheetsList

  if (!querry) {
    context.storage.deleteSheet(selectedSheetName)
    return messenger.send(
      'sheet deleted',
      selectedSheetName,
      context
    )
  }
  let index = Number(querry) - 1
  if (Number.isNaN(index)) {
    index = sheetsList.indexOf(querry)
  }
  if (index <= -1)
    return messenger.send(
      'sheet not exist',
      { index, sheetsList },
      context
    )

  context.storage.deleteSheet(sheetsList[index])
  return messenger.send(
    'sheet deleted',
    sheetsList[index],
    context
  )
}
