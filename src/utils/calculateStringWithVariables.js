import { Parser } from 'expr-eval'

const mp = new Parser()
mp.consts = {}
export default function calculateStrWithVariables(
  calculationStr,
  variables = {},
  variablesList = []
) {
  const nonSettedVariables = variablesList.filter(
    variable => !(variable in variables)
  )
  if (nonSettedVariables.length >= 1) {
    const err = new Error('variables not setted')
    err.nonSettedVariables = nonSettedVariables
    throw err
  }
  let toAdd = 0
  try {
    toAdd = Number(
      mp
        .parse(
          calculationStr === ''
            ? '0'
            : calculationStr
        )
        .evaluate(variables)
    )
  } catch (e) {
    const err = new Error('parse error')
    err.calc = calculationStr
    throw err
  }

  if (toAdd > 100000) {
    const err = new Error('big number')
    err.toAdd = toAdd
    throw err
  }
  return toAdd
}
