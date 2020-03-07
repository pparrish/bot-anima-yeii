import D10 from '../dices/d10'

const d10 = new D10()

export const rollRule = null

export const name = 'type 3'
export const type = 'values'
export const need = 'values to generate'
export const generator = pointsToGenerate => {
  const result = d10.roll(pointsToGenerate)
  return {
    points: result,
    history: result,
  }
}
