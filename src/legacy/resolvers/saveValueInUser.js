// TODO document this
module.exports = async function saveValueInUser ({ habilityName, habilityValue }, { user, rawResponce }) {
  if (habilityValue !== '' && !isNaN(Number(habilityValue)) && Number(habilityValue) <= 10000 && !habilityName.includes('?')) {
    // TODO to a usermanager interface
    await user.child('variables').update({ [habilityName]: habilityValue })
    rawResponce(`Guardado valor de ${habilityName} como ${habilityValue}`)
  } else {
    if (habilityName !== '') {
      let recibedHabilityValue = await user.child('variables').child(habilityValue).once('value')
      recibedHabilityValue = recibedHabilityValue.val()
      if (recibedHabilityValue) {
        rawResponce(`El valor de ${habilityName} es : ${recibedHabilityValue}`)
      } else {
        rawResponce('Para poder guardar la tirada el valor debe de ser un numero y no debe contener el caracter \'?\' ```.t <nombre_de_tirada> NUMERO``` prueba esto ```.t SuperTirada 100```')
      }
    } else {
      let recibedHabilityValue = await user.child('variables').once('value')
      recibedHabilityValue = recibedHabilityValue.val()
      if (recibedHabilityValue) {
        rawResponce('Estas son todos tus valores guardado:')
        for (let variable in recibedHabilityValue) {
          rawResponce(`${variable} = ${recibedHabilityValue[variable]}`)
        }
      } else {
        rawResponce('Para poder guardar la tirada el valor debe de ser un numero y no debe contener el caracter \'?\' ```.t <nombre_de_tirada> NUMERO``` prueba esto ```.t SuperTirada 100```')
      }
    }
  }
}
