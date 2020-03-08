/** Represents a calculated numeric value
 * @param {number} base - The base of the value.
 */
export default class Value {
  constructor(base) {
    this._base = base
  }

  /** type {number} Afther all calculations value */
  get final() {
    return this._base
  }
}
