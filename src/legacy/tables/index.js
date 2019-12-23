// const WordTable = require('word-table')
const tablex = require('table').table
const tables = require('./tables')
const { makeCode } = require('../utils/messagesHelpers')
const tableParts = {}
var tablesIndex = ''

const getTablesIndex = (tables) => tables
  .map((table, index) => getTableName(table, index))
  .reduce((previusTableName, currentTableName) => `${previusTableName}\n${currentTableName}`, '')

function getTableName (table, index) {
  return `Tabla ${index + 1}: ${table.name}`
}

function populateTableParts () {
  tables.map((table, index) => { tableParts[index] = tableToParts(table, index) })
  tablesIndex = getTablesIndex(tables)
}

function tableToParts (table, index, { charLimit = 2000, tableWidth = 30, truncateAt = 100 } = {}) {
  const config = {
    columnDefault: {
      width: Math.floor(tableWidth / table.header.length),
      truncate: truncateAt,
      wrapWord: true
    }
  }
  const data = [table.header, ...table.body]
  const tableString = tablex(data, config)
  let tableInParts = [getTableName(table, index)]

  if (tableString.length <= charLimit) {
    tableInParts.push(makeCode(tableString))
    return tableInParts
  }

  const limit = data.length
  const tableBody = data
  let step = 10

  for (let i = 0; i < limit; i = i + step) {
    let body = tableBody.slice(i, (i + step) >= limit ? limit : i + step)

    const tableString = makeCode(tablex(body, config))

    if (tableString.length >= 2000) {
      i = i - step + 1
      step--
    } else {
      tableInParts.push(tableString)
    }
  }
  return tableInParts
}

async function sendTableMessage (tableInParts, rawResponce) {
  tableInParts.map(async (part) => rawResponce(part))
}
async function responceWithTablesIndex (rawResponce) {
  if (tablesIndex === '') tablesIndex = getTablesIndex(tables)
  rawResponce(tablesIndex)
}

module.exports.command = async function ({ querry }, { rawResponce }) {
  // Sin una querry debemos retornal el indice de tablas
  if (!querry) {
    responceWithTablesIndex(rawResponce)
    return 0
  }
  // Vamo´a hacer busquedas desde aqui
  let index = Number(querry)
  if (index < 1 || !tables[index - 1] && !isNaN(index)) {
    await rawResponce('No existe la tabla ' + index)
    return 1
  }

  if (isNaN(index)) {
    let words = querry.split(' ')
    var lastIndex = 0
    let tt = tables.map((table, index) => getTableName(table, index))
      .filter((tableName, index) => {
        let isMatch = false
        words.map(word => {
          isMatch = isMatch || tableName.toLowerCase().includes(word.toLowerCase())
          lastIndex = isMatch ? index : lastIndex
          return isMatch
        })
        return isMatch
      })
    rawResponce('Resultados con estas palabras: ' + words + '')
    console.log(tt, lastIndex)
    if (tt.length === 1) {
      if (!tableParts[lastIndex]) {
        tableParts[lastIndex] = tableToParts(tables[lastIndex], lastIndex)
      }
      sendTableMessage(tableParts[lastIndex], rawResponce)
      return 0
    }
    tt.map(name => rawResponce(name))
  } else {
    index-- // fix index for arrays
    if (!tableParts[index]) {
      tableParts[index] = tableToParts(tables[index], index)
    }
    await sendTableMessage(tableParts[index], rawResponce)
  }
}
module.exports.tableInParts = tableParts
module.exports.populateTableParts = populateTableParts
