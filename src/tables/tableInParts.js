import { table } from 'table'
import tables from './tables'

const tablesParts = []

export default (
  index,
  {
    charLimit = 2000,
    tableWidth = 30,
    truncateAt = 100,
  } = {}
) => {
  if (tablesParts[index])
    return tablesParts[index]
  const aTable = tables[index]
  if (typeof aTable === 'string') return [aTable]
  const config = {
    columnDefault: {
      width: Math.floor(
        tableWidth / aTable.header.length
      ),
      truncate: truncateAt,
      wrapWord: true,
    },
  }
  const data = [aTable.header, ...aTable.body]
  let tableString = table(data, config)
  const tableInParts = [
    `**Tabla ${index + 1}:** ${aTable.name}`,
  ]

  if (tableString.length <= charLimit) {
    tableInParts.push(
      `\`\`\`${tableString}\`\`\``
    )
    tablesParts[index] = tableInParts
    return tableInParts
  }

  const limit = data.length
  const tableBody = data
  let step = 10

  for (let i = 0; i < limit; i += step) {
    const body = tableBody.slice(
      i,
      i + step >= limit ? limit : i + step
    )

    tableString = `\`\`\`${table(
      body,
      config
    )}\`\`\``

    if (tableString.length >= 2000) {
      i = i - step + 1
      step -= 1
    } else {
      tableInParts.push(tableString)
    }
  }
  tablesParts[index] = tableInParts
  return tableInParts
}
