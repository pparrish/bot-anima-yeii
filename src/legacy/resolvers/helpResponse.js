// TODO: Update help
module.exports = function helpResponse (options, { rawResponce }) {
  rawResponce(
    `
Hola, soy el bot "Anima-yeii", mi principal tarea es hacer tiradas para los controles del juego de rol Anima. Si no sabes de lo que estoy hablando seguro no te voy a ser util u.u 

Calculo las tiradas abiertas y las pifias de manera automatica (escribir /r 1d100 muchas veces es aburrido).

**Para hacer una tirada solo escribe**
\`\`\`.t\`\`\`
Voy a hacer una maravillosa tirada, si el resultado de la tirada es un numero negativo, entonces habras sacado una buena pifiota.

**Hacer una tirada y sumar( o restar ) puntos de habilidad**
\`\`\`.t <habilidad> +5 +10 -50 -<habilidad>\`\`\`
Lanzaré un dado y sumaré o restaré los puntos que me indiques. Aquí no todos los negativos son pifias, asegurate que en la parte de abajo diga que es una pifia. Si tu habilidad es mas de 100, no te preocupes el 3 no es pifia para ti.

**Nombrar y guardar una tirada.**
\`\`\`.ts <nombre_tirada> <valor>\`\`\`
Voy a hacer una tirada con ese valor, pero guardaré por ti ese valor para que no tengas que buscarlo en tu ficha en un futuro. Puedes cambiar el valor guardado simplemente repitiendo el comando con el nuevo valor.

**Recuperar una tirada ya guardada.**
\`\`\`.t <nombre_tirada>\`\`\`
Si quieres hacer una tirada con el valor que habías guardado entonces este es el comando.

**Enviar Errores y sugerencias**
\`\`\`.###issue### <mensaje>\`\`\`
Si tienes algún problema con mi funcionamiento puedes enviar un mensaje a mi creador y seguro intentará resolverlo.

Eso es todo lo que hago por el momento pero espero tener muchas mas funciones pronto
`)
}
