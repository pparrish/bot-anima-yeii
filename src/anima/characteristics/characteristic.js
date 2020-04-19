import { readOnly } from '../utils/classUtils'
import NamedValue from '../NamedValue/NamedValue'
import bonusFunction from './bonusValueOfCharacteristics'

class Characteristic extends NamedValue {
  constructor(name, value = 0, category = '') {
    super(name, value)
    this._.bonus = bonusFunction(this.value)
    this._.category = category
  }

  get bonus() {
    return this._.bonus
  }

  set bonus(_) {
    readOnly('bonus')
  }

  enhance(points) {
    if (points < 0)
      throw new Error(
        'The value must be positive'
      )
    const value = this.value + points
    return this.fromOptions(
      this._promote({ value })
    )
  }

  decrease(points) {
    if (points < 0)
      throw new Error(
        'The value must be positive'
      )
    const value = this.points - points
    if (points < 0)
      throw new Error(
        'The points cannot be negative'
      )
    return this.fromOptions(
      this._promote({ value })
    )
  }

  static fromOptions(options) {
    const { name, value, category } = options
    return new Characteristic(
      name,
      value,
      category
    )
  }

  fromOptions(options) {
    return Characteristic.fromOptions(options)
  }

  isFromCategory(categoryName) {
    return this._.category === categoryName
  }
}
export default Characteristic
