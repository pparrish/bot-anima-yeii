import Dice from '../dices/d10'
import generatePointsWith from './generatePointsWith'

const dice = new Dice()

export const rollRule = (result, history) => {
  if (history.length === 0) {
    return {
      result,
      repeat: true,
    }
  }
  return {
    result:
      result > history[0] ? result : history[0],
    repeat: false,
  }
}
export const name = 'type 2'
export const type = 'values'
export const need = 'values to generate'
export const generator = numberOfCharacteristics =>
  generatePointsWith(
    dice,
    rollRule,
    numberOfCharacteristics
  )
