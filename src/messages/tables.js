import { Util } from 'discord.js'
import getTablesNames from '../tables/getTablesNames'
import tablesInParts from '../tables/tableInParts'

export const allTables = {
  name: 'all tables',
  resolver: (_, { channel }) => {
    const allTablesNames = getTablesNames().map(
      (tableName, index) =>
        `**Tabla ${index + 1}:** ${tableName}`
    )
    Util.splitMessage(
      allTablesNames.join('\n')
    ).map((chunk) =>
      channel.send({
        content: chunk,
      })
    )
  },
}

export const tableNotFound = {
  name: 'table not found',
  resolver: (
    { querry, results },
    { channel }
  ) => {
    let tablesNames = results.map(
      (table) =>
        `**Tabla ${table.index + 1}:** ${
          table.name
        }`
    )
    tablesNames = [...new Set(tablesNames)]
    const tablesRelated = `Las tablas relacionadas con tu busqueda son:
${tablesNames.join('\n')}
Puedes usar \`.tb <numero de tabla>\` para consultar cualquiera de ellas`
    channel.send(
      `No he logrado encontrar la tabla con la búsqueda: ${querry}
${results.length > 0 ? tablesRelated : ''}`,
      { split: true }
    )
  },
}

export const tableNotExist = {
  name: 'table not exist',
  resolver: (tableIndex, { channel }) => {
    channel.send(`La tabla ${
      tableIndex + 1
    } no existe.
Puedes consultar todas las tablas con el comando \`.tb\`
`)
  },
}

export const table = {
  name: 'table',
  resolver: async (tableIndex, { channel }) => {
    tablesInParts(tableIndex).map(async (part) =>
      channel.send(part)
    )
  },
}
