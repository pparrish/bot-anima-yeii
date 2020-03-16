import { readOnly } from './utils/classUtils'

/** Represents cuantity of life
 * @param {number} value - The value of life
 */
export default class Life {
  constructor(value) {
    this._value = value
  }

  set(value) {
    return new Life(value)
  }

  get value() {
    return this._value
  }

  set value(_) {
    readOnly('value')
  }

  increase(value) {
    return new Life(this.value + value)
  }

  decrease(value) {
    return new Life(this.value - value)
  }

  percent(value) {
    return new Life(
      Math.ceil(this.value * (value / 100))
    )
  }
}
