export default function variables(toParse) {
  const result = toParse
    .replace(/\s+/g, ' ')
    .replace(/^\s/g, '')
    .replace(/\s$/g, '')
    .replace(
      /\s*([+-]{0,1})\s*([a-zA-Z:#$@]+[0-9a-zA-Z:#$@]*)/g,
      '?✓$1$2?'
    )
    .split('?')
    .filter(x => x !== '')
    .reduce(
      (prev, curent) => {
        if (curent.startsWith('✓'))
          prev.value.push(curent.slice(1))
        else prev.remainder += curent
        return prev
      },
      { value: [], remainder: '' }
    )
  result.value = result.value
    .map(x => {
      if (x.startsWith('-'))
        return {
          name: x.slice(1),
          type: 'negative',
        }
      if (x.startsWith('+'))
        return {
          name: x.slice(1),
          type: 'positive',
        }
      return { name: x, type: 'positive' }
    })
    .map(x => x.name)
  result.value = [...new Set(result.value)]
  return result
}
