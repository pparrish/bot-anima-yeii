import { required } from '../utils/classUtils'

import NamedValueCollection from '../NamedValue/NamedValueColection'
import listOfAnimaSecondaryCharacteristics from './listOfAnimaSecondaryCharacteristics'

export default class SecondaryCharacteristics extends NamedValueCollection {
  constructor() {
    super(listOfAnimaSecondaryCharacteristics)
  }

  set(name, value = required('value')) {
    const secondaryCharacteristic = this.get(name)
    this._.storage.set(
      name,
      secondaryCharacteristic.fromOptions({
        name,
        value,
      })
    )
    return this
  }
}
