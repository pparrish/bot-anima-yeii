export default prefix => toParse => {
  let remainder = ''
  let optionsString = ''
  if (optionsString === '') {
    remainder = ''
    optionsString = toParse
  } else {
    // Separate all text after the prefix
    ;[remainder, optionsString] = toParse.split(
      prefix
    )
  }
  // if not have options return remainder
  if (optionsString === undefined)
    return { value: {}, remainder }

  const options = optionsString
    .toLowerCase()
    // consecutive spaces to one space
    .replace(/\s+/g, ' ')
    // all spaces betwen a = is deleted '_=_' => '='
    .replace(/\s*=\s*/g, '=')
    // delete spaces before and afther the string
    .replace(/^\s/g, '')
    .replace(/\s$/g, '')
    // split all spaces [option=value,option2=value option3]
    .split(' ')
    // split options and values
    .map(x => x.split('='))
    .map(x =>
      // a single option without value is true by default
      x.length === 1 ? [x[0], true] : [x[0], x[1]]
    )
    // transform into a object
    .reduce((optionObject, current) => {
      const [name, value] = current
      // set correct datatype
      /* eslint-disable no-nested-ternary */
      const newValue =
        value === 'false' ||
        value === 'no' ||
        value === 'n' ||
        value === false
          ? false
          : value === 'true' ||
            value === 'si' ||
            value === 'y' ||
            value === 'yes' ||
            value === true
          ? true
          : !Number.isNaN(Number(value))
          ? Number(value)
          : value
      return { [name]: newValue, ...optionObject }
    }, {})
  return {
    value: options,
    remainder,
  }
}
