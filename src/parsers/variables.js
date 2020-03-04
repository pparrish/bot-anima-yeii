/** Get variables names from a string
 * @param {string} toParse - The string to extract variables names
 * @returns string[] The variables names.
 * @example variables('10 20 foo bar + bazz -búx')
 * //=>['foo', 'bar', 'bazz', 'búx']
 */
export default function variables(toParse) {
  const result = toParse
    .replace(/\s+/g, ' ')
    .replace(/^\s/g, '')
    .replace(/\s$/g, '')
    .replace(
      /\s*([+-]{0,1})\s*([a-zA-ZäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ:#$@]+[0-9a-zA-ZäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ:#$@]*)/giu,
      '?✓$1$2?'
    )
    .split('?')
    .filter(x => x !== '')
    .reduce(
      (prev, curent) => {
        const { value } = prev
        let { remainder } = prev
        if (curent.startsWith('✓'))
          prev.value.push(curent.slice(1))
        else remainder += curent

        return {
          value,
          remainder,
        }
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
