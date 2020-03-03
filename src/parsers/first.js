export default toParse => {
  const value = toParse
    .replace(/\s+/g, ' ')
    .replace(/^\s/g, '')
    .replace(/\s$/g, '')
    .split(' ')[0]
  const remainder = toParse.replace(
    `${value}`,
    ''
  )
  return { value, remainder }
}
