import { required } from '../utils/classUtils'
import NamedValueCollection from '../NamedValue/NamedValueColection'
import listOfPhysicalCapacities from './listOfPhysicalCapacities'

class PhysicalCapacities extends NamedValueCollection {
  constructor() {
    super(listOfPhysicalCapacities)
  }

  set(name, value = required('value')) {
    const physicalCapacity = this.get(name)
    this._.storage.set(
      name,
      physicalCapacity.fromOptions({
        name,
        value,
      })
    )
    return this
  }
}

export default PhysicalCapacities
