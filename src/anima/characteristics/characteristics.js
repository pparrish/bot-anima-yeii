import { required } from '../utils/classUtils'
import NamedValueColection from '../NamedValue/NamedValueColection'

const listOfCharacteristics = require('./listOfAnimaCharacteristics')
  .default

class Characteristics extends NamedValueColection {
  constructor() {
    super(listOfCharacteristics)
  }

  get(name) {
    if (!this.has(name))
      throw new Error(
        `the ${name} ability does not exist`
      )
    return super.get(name)
  }

  set(name, value = required('value')) {
    const characteristic = this.get(name)
    this._.storage.set(
      name,
      characteristic.fromOptions({ name, value })
    )
    return this
  }

  enhance(name, points = required('points')) {
    const characteristic = this.get(name)
    this._.storage.set(
      name,
      characteristic.enhance(points)
    )
    return this
  }

  decrease(name, points = required('points')) {
    const characteristic = this.get(name)
    this._.storage.set(
      name,
      characteristic.decrease(points)
    )
    return this
  }

  bonusOf(name) {
    const characteristic = this.get(name)
    return characteristic.bonus
  }
}
module.exports = Characteristics
