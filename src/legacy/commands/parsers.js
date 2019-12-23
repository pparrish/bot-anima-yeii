module.exports.getPrefixedOptions = function (toParse, aName, consume = true) {
  let name = aName
  let [remainder, options] = toParse.split('?')
  if (options === undefined) return { name, value: {}, remainder }
  options = options
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s*=\s*/g, '=')
    .replace(/^\s/g, '')
    .replace(/\s$/g, '')
    .split(' ')
    .map(x => x.split('='))
    .map(x => x.length === 1
      ? { [x[0]]: true }
      : { [x[0]]: x[1] }
    )
    .reduce((previus, current) => {
      return { ...previus, ...current }
    }, {})
  for (let option in options) {
    options[option] = (options[option] === 'false' || options[option] === 'no' || options[option] === 'n' || options[option] === false)
      ? false
      : (options[option] === 'true' || options[option] === 'si' || options[option] === 'y' || options[option] === true)
        ? true
        : (!isNaN(Number(options[option])))
          ? Number(options[option])
          : options[option]
  }
  return { name, value: options, remainder }
}

module.exports.getVariables = function (toParse, aName, consume = true) {
  let { value, remainder } = toParse
    .replace(/\s+/g, ' ')
    .replace(/^\s/g, '')
    .replace(/\s$/g, '')
    .replace(/\s*([+-]{0,1})\s*([a-zA-Z:#$@]+[0-9a-zA-Z:#$@]*)/g, '?✓$1$2?')
    .split('?')
    .filter(x => x !== '')
    .reduce((prev, curent) => {
      if (curent.startsWith('✓')) prev.value.push(curent.slice(1))
      else prev.remainder = prev.remainder + curent
      return prev
    }, { value: [], remainder: '' })
  value = value.map(x => {
    if (x.startsWith('-')) return { name: x.slice(1), type: 'negative' }
    if (x.startsWith('+')) return { name: x.slice(1), type: 'positive' }
    return { name: x, type: 'positive' }
  })
  return { name: aName, value, remainder: consume ? remainder : toParse }
}
