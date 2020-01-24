// TODO document this
export default async function saveValueInUser(
  { habilityName, habilityValue },
  { user, rawResponce }
) {
  if (
    habilityValue !== '' &&
    !isNaN(Number(habilityValue)) &&
    Number(habilityValue) <= 10000 &&
    !habilityName.includes('?')
  ) {
    // TODO to a usermanager interface
    await user.child('variables').update({ [habilityName]: habilityValue })
    rawResponce(`Guardado valor de ${habilityName} como ${habilityValue}`)
  } else if (habilityName !== '') {
    let recibedHabilityValue = await user
      .child('variables')
      .child(habilityValue)
      .once('value')
    recibedHabilityValue = recibedHabilityValue.val()
    if (recibedHabilityValue) {
      rawResponce(`El valor de ${habilityName} es : ${recibedHabilityValue}`)
    } else {
      rawResponce(
        "Para poder guardar la tirada el valor debe de ser un numero y no debe contener el caracter '?' ```.t <nombre_de_tirada> NUMERO``` prueba esto ```.t SuperTirada 100```"
      )
    }
  } else {
    let recibedHabilityValue = await user.child('variables').once('value')
    recibedHabilityValue = recibedHabilityValue.val()
    if (recibedHabilityValue) {
      let variablesStr = 'Estas son todos tus valores guardados:\n'
      for (const variable in recibedHabilityValue) {
        variablesStr += `**${variable} :** ${recibedHabilityValue[variable]}\n`
      }
      rawResponce(variablesStr)
    } else {
      rawResponce(
        "Para poder guardar la tirada el valor debe de ser un numero y no debe contener el caracter '?' ```.t <nombre_de_tirada> NUMERO``` prueba esto ```.t SuperTirada 100```"
      )
    }
  }
}
