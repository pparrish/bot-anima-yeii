export default [
  {
    name: 'Crear personajes',
    body: `**Paso 1**: Genera tiradas (p:10-11) o usa el clásico 60 puntos 10 valen 11, y anota los puntos para fuerza, destreza, agilidad, constitución, inteligencia, poder, voluntad y percepción. Anota también los bonos (p:11).

**Paso 2:** Anota!!
Tipo de movimiento = agilidad
Cansancio = constitución
Apariencia = Tira un d10 o elige del 1 al 10.
Tamaño = fuerza + constitución
Elige tamaño y peso (p:12).

**Paso 3:** Elige ventajas (p:17-22) y máximo 3 desventajas (p:22-24). Tienes 3 puntos de creación. Anota todos sus efectos.

**Paso 3:** Elije una categoria (p:37-46), ten a la mano los costes y toma nota de los bonos que te ofrece.

**Paso 4:** Elige tus habilidades secundarias (p:49-56), aprovecha para elegir una habilidad física, una psíquica y cinco más para colocar tus bonos de mejora innata(p:15.). Intenta no gastarlo todo.

**Paso 5:** Elije tu arma inicial (p:75-78) o compra alguna tabla de armas (p:62-67).

**Paso 6:** Gasta tus puntos restantes en, vida, ataque, parada o esquiva; Si eres mago en magia; Si eres psíquico en cv o si usas Ki en ello. `,
  },
  {
    name: 'Puntos de vida: pv',
    body: `Los puntos de vida (pv) representan la cantidad de daño que es posible aguantar antes de sufrir un colapso. (leer "Entre la vida y la muerte", p:58 core)

Calculo:
\`\`\`
pv = 20 + 10*constitución + bono_de_constitución + multiplos_de_vida_comprados*constitución
\`\`\`
`,
  },
  {
    name: 'Penalizadores a toda acción',
    body: `Cuando un personaje sufre un negativo a toda acción, representa que se encuentra en un estado deplorable que le impide rendir al máximo de sus posibilidades, tanto física como mentalmente. Por tanto, aplica el negativo a cualquier tirada de un D100 que realice, tanto en controles de habilidades secundarias (controles de Trepar, Advertir...) como primarias. En el cálculo de iniciativa se toma solo la mitad de penalizador. Además, por cada 20 de negativo sufre un -1 a sus controles de características, tipo de movimiento, índice de peso y acumulaciones de ki. Los magos además sufre un penalizador a su act igual a la mitad de dicho negativo (redondeado hacia arriba en múltiplos de 5).

Estos penalizadores no afectan a las resistencias.`,
  },
  {
    name: 'Bonos a toda acción',
    body: `Es el efecto opuesto a los penalizadores a toda acción, aunque no por ello funcionan igual. Los bonos simplemente aumentan las tiradas de habilidades secundarias y de combate (nota: No afecta a turno), así como cada +20 de bono da un +1 a las características en los controles enfrentados. A diferencia de penalizadores a toda acción, el ki, la magia, convocatoria y poderes psíquicos no se ven afectados (aunque sí las proyecciones), así como no aumentan índice de peso ni tipo de movimiento.`,
  },
]
