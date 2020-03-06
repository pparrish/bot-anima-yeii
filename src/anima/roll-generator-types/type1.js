import Dice from '../dices/d10'
import generatePointsWith from './generatePointsWith'

const dice = new Dice()

export const name = 'type 1'
export const type = 'values'
export const need = 'values to generate'
export const rollRule = result => {
  return {
    result,
    repeat: result < 4,
  }
}
export function generator(
  numberOfCharacteristics
) {
  const { points, history } = generatePointsWith(
    dice,
    rollRule,
    numberOfCharacteristics
  )
  // replace the minimun value width 9
  const minimunPoint = points.reduce(
    (minimun, actual) =>
      minimun < actual ? minimun : actual,
    Infinity
  )
  const minimunPointIndex = points.indexOf(
    minimunPoint
  )
  points[minimunPointIndex] = 9
  return {
    points,
    history,
    replaced: minimunPoint,
    replacedIndex: minimunPointIndex,
  }
}
