import tldrs from './tlrds'

export default () =>
  tldrs.map(table => {
    if (typeof table === 'string') {
      return table
    }
    return table.name
  })
