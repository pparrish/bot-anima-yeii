// TODO: Update help
module.exports = function helpResponse (options, { rawResponce }) {
  rawResponce(
    `
Hola, soy el bot "Anima-yeii", mi principal tarea es hacer tiradas para los controles del juego de rol Anima. 

**Para hacer una tirada solo escribe**
\`\`\`.t\`\`\`
Voy a hacer una maravillosa tirada, si el resultado de la tirada es un numero negativo, entonces habras sacado una buena pifiota.

**Para hacer una tirada de d100 sin ninguna regla**
\`\`\`.tc\`\`\`

**Para hacer una tirada de d10 **
\`\`\`.d o .dd \`\`\`

**Hacer una tirada y sumar( o restar ) puntos de habilidad**
\`\`\`.t <habilidad> +5 +10 -50 -<habilidad>\`\`\`
Lanzaré un dado y sumaré o restaré los puntos que me indiques. 

**Nombrar y guardar una habilidad.**
\`\`\`.gv <nombre_de_habilidad> <valor>\`\`\`
Guardaré por ti el valor para que no tengas que buscarlo en tu ficha en un futuro. Puedes cambiar el valor guardado simplemente repitiendo el comando con el nuevo valor.

**Recuperar todos tus habilidades guardadas**
\`\`\`.gv\`\`\`
Voy a mostrar todos los valores que hayas guardado. Cuidado puede ser un mensaje muy largo

**Borrar una habilidad**
\`\`\`.bv <nombre_de_habilidad>\`\`\`
Borrar una habilidad que tengas guardada, usalo si ya no quieres usar alguna habilidad guardada

**Usar una habilidad ya guardada.**
\`\`\`.t <nombre_tirada> \`\`\`
Si quieres hacer una tirada con el valor que habías guardado entonces este es el comando, tambien funciona con '.d'.

**Cargar todas las habilidades secundarias de una ficha de exel**
\`\`\`.ficha\`\`\`
Debes adjuntar en el mismo mensaje la ficha de exel que quieras cargar, Todas las habilidades secundarias de la ficha se cargaran como tiradas para que las puedas usar.

**Mirar una tabla de anima**
\`\`\`.tb <nombre_de_tabla/numero/palabra a buscar>\`\`\`

**Enviar Errores y sugerencias**
\`\`\`.###issue### <mensaje>\`\`\`

Eso es todo lo que hago por el momento pero espero tener muchas mas funciones pronto, U.u estoy en fase beta no seas tan malo conmigo.
`)
}
