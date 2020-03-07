import GENERATORS from './roll-generator-types'
/** Generator of rolls results
 * @param {number} valuesToGenerate - Number of values with the generators work
 * @param {number} pointsToGenerate - Points to be used in generators of points
 */
export default class RollsGenerator {
  constructor(
    valuesToGenerate,
    pointsToGenerate
  ) {
    this.valuesToGenerate = valuesToGenerate
    this.pointsToGenerate = pointsToGenerate
    this.generators = GENERATORS
  }

  /** Generate a result of giben type
   * @param {number | string} type
   * @returns {Object} result of the generator
   */
  generate(type) {
    const generator = this.getGenerator(type)

    let neededValue

    if (generator.need === 'values to generate')
      neededValue = this.valuesToGenerate
    if (generator.need === 'points to generate')
      neededValue = this.pointsToGenerate

    const result = generator.generator(
      neededValue
    )

    return {
      ...result,
      type: generator.name,
      mode: generator.type,
      points: result.points,
    }
  }

  getGenerator(nameOrNumber) {
    if (typeof nameOrNumber === 'number')
      return this.generators[nameOrNumber - 1]
    if (typeof nameOrNumber === 'string')
      return this.generators.find(
        x => x.name === nameOrNumber
      )
    return this
  }
}
