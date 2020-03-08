import { required } from './utils/classUtils'
import tableBonusOfCharacteristics from './tableBonusOfCharacteristics'

const getBonusOfCharacteristic = characteriscicValue => {
  return tableBonusOfCharacteristics.getBonus(
    characteriscicValue
  )
}

/** Represents a anima characteristic.
 * * @param {Name} name - A name of characteristic
 * @param {Value} value - The actual value of a characteristic
 */
export default class Characteristic {
  constructor(
    name = required('name'),
    value = required('Value')
  ) {
    this._name = name
    this._value = value
  }

  /** type {number}
   */
  get value() {
    return this._value.final()
  }

  /** type {number}
   */
  get bonus() {
    return getBonusOfCharacteristic(this.value)
  }
}
