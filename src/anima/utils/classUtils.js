export function required(name = 'is') {
  throw new Error(`Param ${name} missed`)
}
export function readOnly(name = '') {
  throw new Error(`${name} read only`)
}
export function frobiden(message) {
  throw new Error(message)
}

export function isSrtring(something) {
  if (
    typeof something === 'string' ||
    something instanceof String
  )
    return true
  throw new Error(`${something} must be a string`)
}
