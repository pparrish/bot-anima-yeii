const parsers = require('./parsers')
const mustaMatchWithApi = (fn) => test('must return value remainder and name', () => {
  let result = fn('', 'generic')
  expect(result).toHaveProperty('value')
  expect(result).toHaveProperty('name')
  expect(result).toHaveProperty('remainder')
})
test('test parse with "cosa ? foo=bar baz = quuz"', () => {
  let result = parsers.getPrefixedOptions('cosa ? foo=bar baz = quuz', 'options', true)
  expect(result)
    .toHaveProperty('value', { baz: 'quuz', foo: 'bar' })
})
test('test parse width "p rp=90"', () => {
  let result = parsers.getPrefixedOptions('?p rp=90', '', true)
  expect(result.value).toHaveProperty('p', true)
})
describe('getVariables', () => {
  mustaMatchWithApi(parsers.getVariables)
  test('should return a value with a array', () => {
    let result = parsers.getVariables('', 'variables')
    expect(result).toHaveProperty('value', [])
  })
  test('"foo" return one "foo" positive', () => {
    let result = parsers.getVariables('foo', 'v')
    expect(result.value).toEqual([{ name: 'foo', type: 'positive' }])
  })
  test('"- foo" return one "foo" negative', () => {
    let result = parsers.getVariables('- foo', 'v')
    expect(result.value[0]).toHaveProperty('type', 'negative')
  })
  test('"- foo +bar ++ 5 + 6 -7 *8" should return foo negative and bar positive', () => {
    let result = parsers.getVariables('- foo +bar ++ 5 +6 -7 *8', 'v')
    expect(result.value.length).toBe(2)
    expect(result.value[0]).toHaveProperty('type', 'negative')
    expect(result.value[1]).toHaveProperty('type', 'positive')
  })
  test('"foo:bar" return "foo:bar" positive"', () => {
    let result = parsers.getVariables('foo:bar', '')
    expect(result.value[0]).toHaveProperty('name', 'foo:bar')
  })
  test('"foo:bar1" return "foo:bar1" positive"', () => {
    let result = parsers.getVariables('foo:bar1', '')
    expect(result.value[0]).toHaveProperty('name', 'foo:bar1')
  })
  test('consume mode: "foo +10 +bar + 8" return the remainer of "+10 + 8"', () => {
    let result = parsers.getVariables('foo +10 +bar + 8', '', true)
    expect(result.remainder).toBe(' +10 + 8')
  })
  test('not consume mode: "foo +10 +bar + 8" return the remainer of "+10 + 8"', () => {
    let result = parsers.getVariables('foo +10 +bar + 8', '', false)
    expect(result.remainder).toBe('foo +10 +bar + 8')
  })
})
