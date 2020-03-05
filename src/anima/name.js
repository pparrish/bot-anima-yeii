import {
  required,
  isSrtring,
} from './utils/classUtils'

/** Represents a name
 * @param {string} str - The characters representation for the name.
 */
export default class Name {
  constructor(str = required('str')) {
    isSrtring(str)
    this._str = str
  }

  /** @type {string} Complete name without modifications.
   */
  get full() {
    return this._str
  }
}
