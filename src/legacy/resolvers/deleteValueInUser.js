module.exports = async function deleteValueInUser ({ habilityName }, { user, rawResponce }) {
  let recibedHabilityValue = await user.child('variables').child(habilityName).once('value')
  if (recibedHabilityValue.val()) {
    user.child('variables').child(habilityName).set(null)
    rawResponce(`Bye ${habilityName}!!!`)
  }
}
