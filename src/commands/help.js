const messages = {
  HElP: `Hola, soy el bot "Anima-Yeii", mi principal tarea es manejar las tiradas de dados del juego "Anima: Beyond Fantasy

**Estos son los comandos a los que puedo responder**

\`\`\`
.h commando
\`\`\`
Voy a mostrar un mensaje más detallado sobre el uso del comando.

\`\`\`
.t
\`\`\`
Tiradas de d100, manejo las pifias y abiertas por ti.

\`\`\`
.d
\`\`\`
Tiradas de d10, manejo la regla del 10.

\`\`\`
.gv nombre <numero>
\`\`\`
Guardo una variable que despues puede usarse para sumar o restar el resultado de tus tiradas. Usa \`.bv nombre\` para borrarlas.

\`\`\`
.tb <nombre|numero|busqueda>
\`\`\`
Voy a hacer una busqueda de una tabla para que puedas consultarla.

\`\`\`
.ficha | adjuntar ficha de exel en el mismo mensaje
\`\`\`
Voy a leer tu ficha de anima y guardar tus habilidades primarias y secundarias para que puedas usarlas en las tiradas. Usa \`.bficha\` para borrar la ficha.

Por último, si tienes algún problema relacionado a mi funcionamiento puedes usar el comando \`.issue###\` para hacerle saber a mi creador que algo va mal.
`,
  ABILITIES: `Uso detalado del comando t (tirada)
Tiradas de d100, manejo las pifias y abiertas por ti.
\`\`\`
.t [ [ + | - ] <variable|número> ] ]... [?][<opcion>[=<valor>]]...
\`\`\`

Puedes cambiar la configuración de la tirada que vas a realizar si colocas un signo de interrogación seguido de una o varias opciones.

**[a]bierta** = si|no (indica si la tirada admite abierta)
**[ra]bierta** = número (Índica el valor desde el cual se admite una abierta.)
**[p]ifia** = si|no (Índica si la tirada admite pifias)
**[rp]ifia** = número (Índica el valor desde el cual se puede pifiar)

**ejemplos:**

\`.t +10\` tira un d100 y suma 10 al resultado

\`.t ataque - 15\` tira un d100 y le suma la variable ataque guardada y le resta 15 después.

\`.t parada ?p=false o=n\` tira un d100 sin pifias ni abiertas (nota que o de 'open' también funciona)

\`.t -5 ?rp = 4\` tira un d100 pero la pifia ocurre de 4 para abajo (por ejemplo para personajes con mala suerte)
`,
  CHARACTERISTICS: `Uso detalado del comando d (diez)
Tiradas de d10, manejo la regla del 10. 
\`\`\`
.d [ [ + | - ] <variable|número> ] ]... [?][<opcion>[=<valor>]]...
\`\`\`

Puedes cambiar la configuración de la tirada que vas a realizar si colocas un signo de interrogación seguido de una o varias opciones.

**[a]bierta** = si|no (indica si la tirada admite la regla del 10)
**[ra]bierta** = número (Índica el valor desde el cual se aplica la regla del 10.)
**[p]ifia** = si|no (Índica si la tirada admite la regla del 1)
**[rp]ifia** = número (Índica el valor desde el cual se puede aplicar la regla del 1, inactivo por default)

**ejemplos:**

\`.d +10\` tira un d10 y suma 10 al resultado

\`.d inteligencia - 2\` tira un d10 y le suma la variable inteligencia guardada y le resta 2 después.

\`.d agilidad ?p=false o=n\` tira un d10 sin ninguna regla (nota que o de 'open' también funciona)

\`.d -5 ?rp = 4\` tira un d10 pero la regla del 1 es aplicada desde que se obtiene 4
  `,
  SAVE_VARIABLES: `Uso detallado del comando gv (guardar variable).
Guarda una variable en la ficha actual del usuario. Una variable tiene un nombre y un valor y puede ser usada en las tiradas de dados para sumar o restar su valor. Cuando ocurre una pifia las variables no se suman.

\`\`\`
.gv [nombre] [numero]
\`\`\`

Este comando tiene 3 modos.

1. Si se usa solo, entonces muestra todas las variables y sus valores guardadas en tu ficha actual.
2. Si se usa con solo el nombre de una variable, entonces va a hacer una busqueda en todas tus variables y mostrará su valor si la encuentra.
3. Si se usa un nombre y un valor numerico juntos, entonces guardara la variable en su ficha actual. Si la variable ya existe entonces reemplaza el valor anterior por el nuevo.
`,
  DELETE_VARIABLES: `Uso detallado del comando bv (borrar variable).
Borra una variable de tu ficha actual.

\`\`\`
.bv [nombre]
\`\`\`

La variable dejara de existir y no podra usarse en las tiradas, hasta que la guardes de nuevo.
`,
  TABLES: `Uso detallado del comando tb (table)
Hace una busqueda de una tabla en especifico, ya sea por nombre, por numero de tabla o por palabras.

\`\`\`
.tb <nombre de tabla|numero de tabla|busqueda>
\`\`\`

Si encuentra dos coincidencias con tu busqueda apareceran las dos, para que puedas acceder a ella mediante el numero de la tabla.

**Ejemplos**

\`.tb venenos\` Busca la tabla de venenos (como existen dos tablas con el nombre de venenos te mostrara su numero de tabla y nombre).
\`.tb 16\` Busca la numero 16.
\`.tb preparación forja\` Busca la tabla que coincida con las palabras preparación y forja.
`,
  SHEET: `Uso detallado del comando ficha.
Recibe una ficha de anima para ser procesada y guardandola para ti, las caracteristicas y habilidades quedaran guardadas como variables.

\`\`\`
.ficha [nombre] || adjuntar una ficha de anima.
o 
.ficha [nombre] || adjuntar una imagen.
\`\`\`

El comando ficha tiene varios modos.
1. Si usas el comando sin adjuntar ningun archivo ni un nombre, entonces te mostrara una lista de todas fichas que haz creado.
2. Si usas el comando con un nombre de ficha cambiaras a la ficha con dicho nombre, las variables se guardan por ficha asi que al cambiar todas seran diferentes. Si no existe la ficha, se creara una nueva, vacia y con ese nombre.
3. Si envias una ficha de anima la ficha sera procesada, adicionalmente puedes colocar un nombre para que la ficha sea guardada con ese nombre.*
4. Si envias una imagen, esta se convertira en la imagen que aparecera en tus tiradas junto con el nombre de tu ficha. Adicionalmente puedes colocar un nombre para que sea guardada con ese nombre.*

* Al colocar un nombre siempre cambiaras a la ficha con el nombre que colocaste.

El sistema busca palabras comunes a tu busqueda, por lo que algunas busquedas no generarán una ficha, usa \`.ficha <busqueda> ?f\` para forzar a crear una ficha nueva

Todo usuario inicia con la ficha default.
  `,
  DELETE_SHEET: `Uso detallado del comando bficha (borrar ficha)

Borra una ficha de tu perfil, cualquier ficha puede ser borrada menos la ficha default. Cuando borras la ficha actual, cambias inmediatamente a default.

\`\`\`
.bficha <numero>
\`\`\`
  `,
  ISSUES: `Uso detallado del comando issue###
Cuando tengas una duda o sugerencia, o algo salga mal en el bot puedes usar este comando para comunicarte con el autor del bot, el cual trabaja raudo y veloz para intentar solucionarlo. El abuso de este comando puede probocar baneos, come fru...


\`\`\`
.issue### [mensaje]
\`\`\`
  `,
}

export default (
  { command },
  context,
  messenger
) => {
  if (command === 't')
    return messenger.send(
      'raw',
      { text: messages.ABILITIES },
      context
    )
  if (command === 'd')
    return messenger.send(
      'raw',
      { text: messages.CHARACTERISTICS },
      context
    )
  if (command === 'tb')
    return messenger.send(
      'raw',
      { text: messages.TABLES },
      context
    )
  if (command === 'gv')
    return messenger.send(
      'raw',
      { text: messages.SAVE_VARIABLES },
      context
    )
  if (command === 'bv')
    return messenger.send(
      'raw',
      { text: messages.DELETE_VARIABLES },
      context
    )
  if (command === 'issue###')
    return messenger.send(
      'raw',
      { text: messages.ISSUES },
      context
    )
  if (command === 'ficha')
    return messenger.send(
      'raw',
      { text: messages.SHEET },
      context
    )
  if (command === 'bficha')
    return messenger.send(
      'raw',
      { text: messages.DELETE_SHEET },
      context
    )
  console.log('command')
  return messenger.send(
    'raw',
    { text: messages.HElP },
    context
  )
}
