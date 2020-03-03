import tables from './tables'

export default () =>
  tables.map(table => {
    if (typeof table === 'string') {
      return table
    }
    return table.name
  })
