export default function calc(toParse) {
  let result = toParse
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s*-\s*/g, ' - ')
    .replace(/\s+/g, ' ')
    .replace(/^\s/g, '')
    .replace(/\s$/g, '')
  if (result.startsWith('+'))
    result = result.slice(2)
  return { value: result, remainder: '' }
}
