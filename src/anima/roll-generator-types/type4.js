import D10 from '../dices/d10'

const d10 = new D10()
export const rollRule = null
export const name = 'type 4'
export const type = 'points'
export const need = 'values to generate'
export const generator = numberOfCharacteristics => {
  const numberOfRolls =
    numberOfCharacteristics -
    Math.floor(numberOfCharacteristics * 0.14)
  const history = d10.roll(numberOfRolls)
  const points = history.reduce(
    (aPoints, roll) => aPoints + roll,
    0
  )

  return { points, history }
}
