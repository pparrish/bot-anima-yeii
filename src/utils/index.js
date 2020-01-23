export function replaceFrobidenCharacters(str) {
  let newStr = str.replace('.', '__d__', 'g')
  newStr = newStr.replace('#', '__h__', 'g')
  newStr = newStr.replace('$', '__$__', 'g')
  newStr = newStr.replace('[', '__ob__', 'g')
  newStr = newStr.replace(']', '__cb__', 'g')
  return newStr
}

export function recoverFrobidenCharacters(str) {
  let newStr = str.replace('__d__', '.', 'g')
  newStr = newStr.replace('__h__', '#', 'g')
  newStr = newStr.replace('__$__', '$', 'g')
  newStr = newStr.replace('__ob__', '[', 'g')
  newStr = newStr.replace('__cb__', ']', 'g')
  return newStr
}
