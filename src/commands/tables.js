import searchInNames from '../utils/searchInNames'
import getTablesNames from '../tables/getTablesNames'

export default (
  { querry },
  context,
  messenger
) => {
  if (!querry?.trim())
    return messenger.send(
      'all tables',
      null,
      context
    )
  const tablesNames = getTablesNames()
  let tableIndex = Number(querry)
  if (!Number.isNaN(tableIndex)) {
    tableIndex -= 1
  }
  if (Number.isNaN(tableIndex)) {
    const { hardMatch, softhMatch } =
      searchInNames(querry, tablesNames)

    if (hardMatch.length === 1)
      tableIndex = hardMatch[0].index
    else if (softhMatch.length === 1)
      tableIndex = softhMatch[0].index
    else
      return messenger.send(
        'table not found',
        {
          querry,
          results: [...hardMatch, ...softhMatch],
        },
        context
      )
  }
  if (
    tableIndex <= -1 ||
    tableIndex > tablesNames.length - 1
  )
    return messenger.send(
      'table not exist',
      tableIndex,
      context
    )
  return messenger.send(
    'table',
    tableIndex,
    context
  )
}
