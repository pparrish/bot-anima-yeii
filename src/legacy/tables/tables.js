module.exports = [
  {
    name: 'Controles de Caracteristicas',
    header: ['Dificultad', 'Valor'],
    body: [
      ['simple', '6+'],
      ['normal', '10+'],
      ['complejo', '15+'],
      ['extrenmo', '20+']
    ]
  },
  {
    name: 'Bonos de Características',
    header: ['Características', 'Bonos'],
    body: [
      ['1', '-30'],
      ['2', '-20'],
      ['3', '-10'],
      ['4', '-5'],
      ['5', '0'],
      ['6-7', '+5'],
      ['8-9', '+10'],
      ['10', '+15'],
      ['11-12', '+20'],
      ['13-14', '+25'],
      ['15', '+30'],
      ['16-17', '+35'],
      ['18-19', '+40'],
      ['20', '+45']
    ]
  },
  {
    name: 'Tamaño y peso',
    header: ['Tamaño', 'Altura', 'Peso'],
    body: [
      ['2', '0.20 a 0.60 m', '5 a 15kg'],
      ['3', '0.40 a 0.60 m', '10 a 20 kg'],
      ['4', '0.60 a 1.00 m', '20 a 30 kg'],
      ['5', '0.80 a 1.20 m', '20 a 50 kg'],
      ['6', '1.00 a 1.40 m', '30 a 50 kg'],
      ['7', '1.10 a 1.50 m', '30 a 60 kg'],
      ['8', '1.20 a 1.60 m', '35 a 70 kg'],
      ['9', '1.30 a 1.60 m', '40 a 80 kg'],
      ['10', '1.40 a 1.70 m', '40 a 90 kg'],
      ['11', '1.40 a 1.80 m', '50 a 100 kg'],
      ['12', '1.50 a 1.80 m', '50 a 120 kg'],
      ['13', '1.50 a 1.80 m', '50 a 140 kg'],
      ['14', '1.60 a 1.90 m', '50 a 150 kg'],
      ['15', '1.60 a 2.00 m', '60 a 180 kg'],
      ['16', '1.70 a 2.10 m', '70 a 220 kg'],
      ['17', '1.70 a 2.10 m', '80 a 240 kg'],
      ['18', '1.80 a 2.20 m', '90 a 260 kg'],
      ['19', '1.90 a 2.30 m', '100 a 280 kg'],
      ['20', '2.00 a 2.40 m', '110 a 320 kg'],
      ['21', '2.10 a 2.60 m', '120 a 450 kg'],
      ['22', '+2.5 m', '+400 kg']
    ]
  },
  {
    name: 'Puntos de Vida Base',
    header: ['Constitución', 'Puntos de Vida Base'],
    body: [
      ['1', '5'],
      ['2', '20'],
      ['3', '40'],
      ['4', '55'],
      ['5', '70'],
      ['6', '85'],
      ['7', '95'],
      ['8', '110'],
      ['9', '120'],
      ['10', '135'],
      ['11', '150'],
      ['23', '160'],
      ['13', '175'],
      ['14', '185'],
      ['15', '200'],
      ['16', '215'],
      ['17', '225'],
      ['18', '240'],
      ['19', '250'],
      ['20', '265']
    ]
  },
  {
    name: 'Presencia Base',
    header: ['Nivel', 'Precencia'],
    body: [
      ['1', '30'],
      ['2', '35'],
      ['3', '40'],
      ['4', '45'],
      ['5', '50'],
      ['6', '55'],
      ['7', '60'],
      ['8', '65'],
      ['9', '70'],
      ['10', '75'],
      ['11', '80'],
      ['12', '85'],
      ['13', '90'],
      ['14', '95'],
      ['15', '100'],
      ['+1 nivel', '+5']
    ]
  },
  {
    name: 'Progresión Por Nivel',
    header: ['Nivel', 'PD', '+Características por nivel', 'Expeciencia Necesaria', 'Precencia Base'],
    body: [
      ['0', '400', '', 'N/A', '20'],
      ['1', '600', '', '0', '30'],
      ['2', '700', '+1', '100', '35'],
      ['3', '800', '', '225', '40'],
      ['4', '900', '+1', '375', '45'],
      ['5', '1000', '', '550', '50'],
      ['6', '1100', '+1', '750', '55'],
      ['7', '1200', '', '975', '60'],
      ['8', '1300', '+1', '1225', '65'],
      ['9', '1400', '', '1500', '70'],
      ['10', '1500', ' +1', '1800', '75'],
      ['11', '1600', '', '2125', '80'],
      ['12', '1700', ' +1', '2475', '85'],
      ['13', '1800', '', '2850', '90'],
      ['14', '1900', '+1', '3250', '95'],
      ['15', '2000', '', '3675', '100'],
      ['+1', '+100', '+1 (Cada nivel par)', '+450', '+5']
    ]
  },
  {
    name: 'Dificultades',
    header: ['Dificultad', 'Requerimentos', 'Explicación'],
    body: [
      ['Rutinario RUT',
        '20',
        'Son acciones normales, que todos realizamos a la primera sin ni siquiera tener la necesidad de saber hacerlas, como bajar de un salto las escaleras o escuchar una explosión. Por regla general, el Director de Juego nunca pedirá a un jugador practicar controles de habilidad de esta dificultad, salvo en circunstancias muy determinadas.'
      ],
      ['Fácil FAC',
        '40',
        'Las acciones fáciles son cosas que todos estamos acostumbrados a realizar, como abrir una cerradura oxidada sin problemas o recordar un simple tarareo. Incluso si no se sabe nada de la materia, un par de intentos fallidos bastarán para conseguirlo finalmente. El problema es si tiene que salirte bien a la primera, y debes abrir esa puerta oxidada antes de que ellos te alcancen...'
      ],
      [
        'Media MED',
        '80',
        'Es un nivel de dificultad mayor. Son cosas que la mera suerte no siempre te permite hacer y sólo alguien que tenga conocimientos en la materia podrá realizar comúnmente, como forzar una cerradura simple o curar una molesta gripe.'
      ],
      [
        'Difícil DIF',
        '120',
        'Son aquellas acciones que resultan muy problemáticas para una persona normal. Requieren una gran dosis de habilidad o una suerte desigual para realizarlas. Son actividades complejas por naturaleza, como subir por una pared escarpada sin ayuda o realizar malabares circenses.'
      ],
      [
        'Muy difícil MDF',
        '140',
        'Para realizar acciones muy difíciles se requiere una enorme habilidad. Es el límite de dificultad que pueden alcanzar las personas normales. Sólo los mejores expertos podrán realizarlas sin problemas, y siempre dejando boquiabiertos a quienes les observen. Algunos ejemplos serían caminar por la cuerda floja o realizar un salto mortal en el trapecio.'
      ],
      [
        'Absurdo ABS',
        '180',
        'Como su nombre indica, son cosas que están más allá de las posibilidades de una persona normal. Únicamente los grandes campeones o los superdotados podrían llegar a realizarlas con habitualidad, aunque no sin cierto esfuerzo. Algunos ejemplos serían hacer acrobacias olímpicas en la pértiga o realizar operaciones matemáticas como una calculadora mecánica.'
      ],
      [
        'Casi imposible CIM',
        '240',
        'Incluso los mejores encontrarán mucha dificultad en estas acciones casi imposibles, y la mayoría de veces estarán condenadas al fracaso. Son actos que sólo un gran campeón o el héroe de la película consiguen en el momento crítico, como correr por un puente que se derrumba apoyándose en las piedras que están cayendo y realizar un increíble salto final.'
      ],
      [
        'Imposible IMP',
        '280',
        'Realizar una acción imposible es algo que nadie pensaría que se puede hacer. Son actos que bordean aquello que llamamos realidad pero que, por increíble o milagroso que parezca, son físicamente posibles. Un experto necesitará tener el momento más brillante de su carrera para conseguir algo imposible, como correr los cien metros por debajo de 8 segundos con cota de mallas o esquivar una bala no por suerte, sino viéndola venir y calculando su trayectoria.'
      ],
      [
        'Inhumano INH',
        '320',
        'Sencillamente es algo que en nuestro mundo, en la realidad, no se puede físicamente realizar. Son cosas que van en contra de la lógica de una manera limitada, como levantar una camioneta a pulso, subir a un tercer piso de un salto o correr entre una lluvia de balas de alta velocidad esquivándolas sin problemas. La misma habilidad por tirada no basta para alcanzar algo así a la hora de realizar estas proezas. Es necesario que los personajes tengan acceso a realizar acciones inhumanas para alcanzar esta dificultad.'
      ],
      [
        'Zen ZEN',
        '440',
        'Son actos que de por sí rompen totalmente la lógica de aquello que llamamos realidad, como recorrer más de mil metros por debajo de un segundo o saltarlos verticalmente sin preparación. Al igual que la Inhumanidad, la mera habilidad no permite realizar acciones de Zen, por lo que el personaje tendrá que poseer sobrenaturalmente la capacidad de hacerlas.'
      ]
    ]
  },
  {
    name: 'Atletismo',
    header: [ 'Cantidad', 'Tipo de Movimiento', 'Corriendo', 'Movimiento Máximo' ],
    body: [
      [ '-', '', '1 Minuto', '1 asalto' ],
      [ '40', '', '5 minutos', '2 asaltos' ],
      [ '80', '', '10 minutos', '5 asaltos' ],
      [ '120', '', '20 minutos', '10 asaltos' ],
      [ '140', '', '40 minutos', '15 asaltos' ],
      [ '180', '+1', '1 hora', '1 minuto' ],
      [ '240', '+1', '2 horas', '2 minutos' ],
      [ '280', '+2', '5 horas', '3 minutos' ],
      [ '320', '+2', '1 día', '5 minutos' ],
    ]
  },
  {
    name: 'Nadar',
    header: ['Cantidad', 'Dificultad', 'Tipo de Movimiento'],
    body: [
      [ '-', '', '-8' ],
      [ '40', 'Fácil', '-5' ],
      [ '80', 'Media', '-4' ],
      [ '120', 'Difícil', '-3' ],
      [ '140', 'Muy Difícil', '-3' ],
      [ '180', 'Absurdo', '-2' ],
      [ '240', 'Casi Imposible', '-2' ],
      [ '280', 'Imposible', '-1' ],
      [ '320', 'Inhumano', '0' ]
    ]
  },
  {
    name: 'Saltar',
    header: ['Cantidad', 'Dificultad', 'Tipo de Movimiento'],
    body: [
      [ '-', '', '-1' ],
      [ '40', 'Fácil', '+0' ],
      [ '80', 'Media', '+0' ],
      [ '120', 'Difícil', '+1' ],
      [ '140', 'Muy Difícil', '+1' ],
      [ '180', 'Absurdo', '+2' ],
      [ '240', 'Casi Imposible', '+2' ],
      [ '280', 'Imposible', '+4' ],
      [ '320', 'Inhumano', '+5' ]
    ]
  },
  {
    name: 'Modificadores a la Percepción',
    header: ['', 'Modificador'],
    body: [
      ['Vista', '||||||'],
      [ 'Zona parcialmente oscura', '-30' ],
      [ 'Oscuridad completa', '-60' ],
      [ 'Lluvia', '-20' ],
      [ 'El blanco sólo es visible en parte', '-30' ],
      [ 'Blanco camuflado como el ambiente', '-30' ],
      [ 'El color contrasta con el ambiente', '+40' ],
      [ 'El personaje está preparado', '+20' ],
      [ 'Posición superior o elevada', '+30' ],
      [ 'Oído', '||||||' ],
      [ 'Ligero ruido de fondo', '-20' ],
      [ 'Personas hablando', '-40' ],
      [ 'Ruidos estridentes', '-80' ],
      ['Olfato', '||||||'],
      [ 'Olor obvio', '+30' ],
      [ 'Varios olores presentes', '-30' ],
      ['Tacto', '||||||'],
      [ 'Llevando guantes', '-40' ],
      ['Gusto', '||||||'],
      [ 'Sabor conocido', '+40' ],
      [ 'Paladar inactivo', '-40' ]
    ]
  },
  {
    name: 'Tratamiento de Heridas',
    header: ['Cantidad', 'Dificultad', 'Recuperación'],
    body: [
      ['40', 'Fácil', 'Detener hemorragia'],
      ['80', 'Media', 'Estabilizar'],
      ['120', 'Difícil', '+10% del daño'],
      ['140', 'Muy', 'Difícil +20% del daño'],
      ['180', 'Absurdo', '+30% del daño'],
      ['240', 'Casi', 'Imposible +40% del daño'],
      ['280', 'Imposible', '+50% del daño'],
      ['320', 'Inhumano', '+70% del daño']
    ]
  },
  {
    name: 'Frialdad',
    header: ['Cantidad', 'Dificultad', 'Bono'],
    body: [
      ['40', 'Fácil', '+5'],
      ['80', 'Media', '+10'],
      ['120', 'Difícil', '+15'],
      ['140', 'Muy Difícil', '+20'],
      ['180', 'Absurdo', '+25'],
      ['240', 'Casi Imposible', '+30'],
      ['280', 'Imposible', '+35'],
      ['320', 'Inhumano', '+40']
    ]
  },
  {
    name: 'Proezas de Fuerza',
    header: ['Cantidad', 'Dificultad', 'Modificador a la Fuerza'],
    body: [
      ['120', 'Dificil', 'Fuerza +1'],
      ['180', 'Absurdo', 'Fuerza +2'],
      ['240', 'Casi Imposible', 'Fuerza +3'],
      ['280', 'Imposible', 'Fuerza +4']
    ]
  },
  {
    name: 'Resistir El Dolor',
    header: ['Cantidad', 'Dificultad', 'Negativo anulado'],
    body: [
      ['80', 'Media', '-10'],
      ['120', 'Dificil', '-20'],
      ['140', 'Muy Difícil', '-30'],
      ['180', 'Absurdo', '-40'],
      ['240', 'Casi Imposible', '-50'],
      ['280', 'Imposible', '-60'],
      ['320', 'Inhumano', '-70'],
      ['440', 'Zen', '-80']
    ]
  },
  {
    name: 'Disfraz',
    header: ['Situación', 'Bono'],
    body: [
      ['Menos de un minuto de preparación', '-20'],
      ['Sobre una hora de preparación', '+20'],
      ['Varias horas de preparación', '+40'],
      ['Sin material para disfrazarse', '-40'],
      ['Material improvisado', '-20'],
      ['Material apropiado', '+20'],
      ['Trajes y maquillaje preparados', '+40']
    ]
  },
  {
    name: 'Ocultarse',
    header: ['Situación', 'Bono'],
    body: [
      ['Tamaño grande', '-20'],
      ['Tamaño pequeño', '+20'],
      ['Delante de un individuo', '-200'],
      ['Lugar propicio para esconderse', '+40'],
      ['Zona con sombras', '+20'],
      ['Lugar iluminado', '-20'],
      ['Zona vacía', '-80']
    ]
  }, {
    name: 'Trampería',
    header: ['Cantidad', 'Dificultad', 'Nivel de la trampa'],
    body: [
      ['20', 'Rutinario', 'Nivel 10'],
      ['40', 'Fácil', 'Nivel 20'],
      ['80', 'Media', 'Nivel 30'],
      ['120', 'Difícil', 'Nivel 40'],
      ['140', 'Muy Difícil', 'Nivel 50'],
      ['180', 'Absurdo', 'Nivel 60'],
      ['240', 'Casi Imposible', 'Nivel 70'],
      ['280', 'Imposible', 'Nivel 80'],
      ['320', 'Inhumano', 'Nivel 90'],
      ['440', 'Zen', 'Nivel 100']
    ]
  },
  {
    name: 'Preparación de Trampas',
    header: ['Situación', 'Bono'],
    body: [
      ['Menos de un minuto de preparación', '-60'],
      ['Unas horas de preparación', '+0'],
      ['Unos días de preparacion', '+40'],
      ['Semanas de preparacion', '+80'],
      ['Material improvisado', '-40'],
      ['Material exclusivamente preparado', '+40']
    ]
  }, {
    name: 'Venenos',
    header: ['Cantidad', 'Dificultad', 'Nivel del Veneno'],
    body: [
      ['40', 'Fácil', 'Nivel 10'],
      ['80', 'Media', 'Nivel 20'],
      ['120', 'Difícil', 'Nivel 30'],
      ['140', 'Muy Difícil', 'Nivel 40'],
      ['180', 'Absurdo', 'Nivel 50'],
      ['240', 'Casi Imposible', 'Nivel 60'],
      ['280', 'Imposible', 'Nivel 70'],
      ['320', 'Inhumano', 'Nivel 80'],
      ['440', 'Zen', 'Nivel 90']
    ]
  }, {
    name: 'Preparación Para La Forja',
    header: ['Tiempo empleado', 'Bono'],
    body: [
      ['Una hora', '-60'],
      ['Unas tres o cuatro horas', '-40'],
      ['Un día', '-20'],
      ['Dos o tres días', '-10'],
      ['Una semana', '0'],
      ['Dos semanas', '+10'],
      ['Un mes', '+20'],
      ['Dos o tres meses', '+40'],
      ['Seis meses', '+60'],
      ['Un año', '+80'],
      ['Tres o cuatro años', '+100'],
      ['Unos diez años', '+120']
    ]
  }, {
    name: 'Forja',
    header: ['Dificultad', 'Cantidad', 'Armas', 'Armaduras', 'Yelmos', 'Otros'],
    body: [
      ['Fácil', '40', 'Flecha de descarga, Flecha de fajo, Garrote, Vara', '', 'Anilla, Capucha de cuero, Frentón', 'Herraduras, Hebillas, Enganches, Chapas, Cubiertos, Cazos, Sartenes'],
      ['Media', '80', 'Arpón,Bala,Bolas,Cadena,Daga,Dardos,Dardos de cerbatana, Dardos de mano, Garfio, Guadaña, Gran martillo de guerra, Hacha de mano,Honda,Javalina,Lanza,Lazo,Mangual,Martillo de Guerra,Mayal, Maza,Maza pesada a dos manos, Tonga', 'Acolchada,Completa de cuero,Cuero,Cuero endurecido,Piel', 'Coronilla', 'Bisutería,Candelabros'],
      ['Difícil', '120', 'Abanico de combate,Alabarda,Arco Corto,Arco Largo,Boleadoras,Cerbatana,Cimitarra,Cuervo,Daga de parada,Escudo corporal,Espada ancha,Espada bastarda, Espada corta, Espada larga, Estilete, Flecha de mella, Garras, Hacha a dos manos, Hacha de guerra, Kusari-Gama,Lanza de caballeria, Látigo,Nunchaku,Red de gladiador, Rodela, Shuriken, Tridente', 'Anillas, Cuero Tachonado, Gabardina Armada, Mallas, Peto,Piezas', 'Capucha de Mallas, Completo abierto', 'Bisutería elaborada, Bardas'],
      ['Muy Difiíl', '140', 'Arco Largo Compuesto, Ballesta, Ballesta Pesada, Bumerán,Cestus, Estoque, Florete, Katana, Katar, Mandoble, No-Dachi, Quebradora, Sable, Sai, Shuko, Tanto', 'Escamas, Placas,Semicompleta', 'Completo Cerrado', 'Lámparas, Artesania fina'],
      ['Absurdo', '180', 'Anciano de Primavera, Katana de Dos Hojas, Turcus,Arcabuz, Ballesta de Mano, Ballesta de Repetición, Pistola de Mecha', 'Completa, Completa Pesada, Completa de Campaña', '', 'Lentes, Relojes, Catalejos, Brújulas']
    ]
  }
]
