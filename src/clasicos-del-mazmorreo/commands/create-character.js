import Dice from '../../dices/dice'

const d4 = new Dice(4)
const d6 = new Dice(6)
const d12 = new Dice(12)
const d24 = new Dice(24)
const d30 = new Dice(30)
const d100 = new Dice(100)

const caracteristicas = [
  'fuerza',
  'agilidad',
  'vigor',
  'personalidad',
  'inteligencia',
  'suerte',
]

const modificadoresPuntuacionCaracteristicas = [
  null,
  null,
  -3,
  -2,
  -2,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  2,
  2,
  3,
]

const equipo = [
  'Agua bendita, 1 vial',
  'Aceite, 1 frasco',
  'Antorcha',
  'Cadena 10’',
  'Clavos de hierro',
  'Cofre, vacío',
  'Cuerda 50’',
  'Espejo de mano',
  'Frasco, vacío',
  'Garfio de escalada',
  'Herramientas de ladrón',
  'Linterna',
  'Martillo pequeño',
  'Mochila',
  'Odre',
  'Palanqueta',
  'Pértiga, 10 pies',
  'Raciones',
  'Saco, grande',
  'Saco, pequeño',
  'Símbolo sagrado',
  'Tiza, 1 trozo',
  'Vela',
  'Yesca y pedernal',
]

const puntuacionDeSuerte = [
  'Crudo invierno: todas las tiradas de ataque',
  'El toro: tiradas de ataque cuerpo a cuerpo',
  'Fecha agraciada: tiradas de ataque de proyectiles',
  'Criado por lobos: tiradas de ataque sin armas',
  'Concebido sobre un caballo: tiradas de ataque montado',
  'Nacido en el campo de batalla: tiradas de daño',
  'La senda del oso: tiradas de daño cuerpo a cuerpo',
  'Ojo de halcón: tiradas de daño de proyectiles',
  'Cazador en manada: tiradas de ataque y daño con el arma inicial de nivel 0',
  'Nacido bajo el telar: pruebas de habilidad (incluyendo las habilidades de ladrón)',
  'Astucia vulpina: encontrar/desactivar trampas',
  'Trébol de cuatro hojas: encontrar puertas secretas',
  'Séptimo hijo: pruebas de conjuro',
  'Tormenta furiosa: daño de conjuros',
  'Corazón virtuoso: pruebas de expulsar lo impío',
  'Sobrevivió a la peste: curación mágica*',
  'Signo afortunado: tiradas de salvación',
  'Ángel guardián: tiradas de salvación contra trampas',
  'Sobrevivió a la picadura de una araña: tiradas de salvación contra venenos',
  'Alcanzado por un rayo: tiradas de salvación de Reflejos',
  'Sobrevivió a la hambruna: tiradas de salvación de Fortaleza',
  'Resistió a la tentación: tiradas de salvación de Voluntad',
  'Hogar venturoso: Clase de Armadura',
  'Veloz como la cobra: iniciativa',
  'Cosecha abundante: puntos de golpe (se aplica cada nivel)',
  'Brazo de guerrero: tablas de impacto crítico**',
  'Hogar impío: tiradas de corrupción',
  'La Estrella Rota: pifias**',
  'Canto de ave: idiomas adicionales',
  'Niño salvaje: velocidad (cada +1/-1 = +5’/-5’ a la velocidad)',
]

const oficios = [
  'Adiestrador	Garrote	Poni',
  'Alquimista	Bastón	Aceite, 1 frasco',
  'Apicultor	Bastón	Jarra de miel',
  'Aprendiz de mago	Daga	Grimorio de magia negra',
  'Armero	Martillo (igual que garrote)	Casco de hierro',
  'Astrólogo 	Daga 	Catalejo',
  'Bandido 	Espada corta	Armadura de cuero',
  'Barbero 	Navaja (igual que daga)	Tijeras',
  'Bufón 	Dardo	Ropas de seda',
  'Caballerizo 	Bastón	Brida',
  'Carnicero 	Cuchillo de carnicero (igual que hachuela)	Lomo de ternera',
  'Carretero 	Garrote	Carreta de mano***',
  'Cazador 	Arco corto	Piel de ciervo',
  'Cazador 	Arco corto	Piel de ciervo',
  'Cerrajero 	Daga	Herramientas de calidad',
  'Chamán 	Maza	Hierbas, 1 libra',
  'Contrabandista 	Honda	Saco impermeable',
  'Cordelero 	Cuchillo (igual que daga) 	Cuerda, 100’ ',
  'Cortabolsas 	Daga	Cofre pequeño',
  'Curandero 	Garrote	Agua bendita, 1 vial',
  'Destripaterrones 	Pala (igual que bastón)	Tierra fértil, 1 libra',
  'Elfo abogado 	Pluma (igual que dardo) 	Libro',
  'Elfo artesano 	Bastón 	Arcilla, 1 libra',
  'Elfo candelero 	Tijeras (igual que daga) 	Velas, 20',
  'Elfo cetrero 	Daga 	Halcón',
  'Elfo guardabosques 	Bastón 	Hierbas, 1 libra',
  'Elfo guardabosques 	Bastón 	Hierbas, 1 libra',
  'Elfo guía 	Arco 	Catalejo',
  'Elfo sabio 	Daga 	Pergamino y pluma',
  'Elfo sabio 	Daga 	Pergamino y pluma',
  'Elfo vidriero 	Martillo 	Cuentas de cristal',
  'Embaucador 	Daga	Capa de buena calidad',
  'Enano boticario	Porra (igual que bastón) 	Vial de acero',
  'Enano cantero 	Martillo 	Piedra de calidad, 10 libras',
  'Enano cantero 	Martillo 	Piedra de calidad, 10 libras',
  'Enano cazador de ratas	Garrote 	Red',
  'Enano cofrero 	Cincel (igual que daga) 	Madera, 10 libras',
  'Enano granjero de champiñones	Pala (igual que bastón)	Saco',
  'Enano herrero	Martillo (igual que garrote)	Mitril, 1 onza',
  'Enano herrero	Martillo (igual que garrote)	Mitril, 1 onza',
  'Enano minero 	Pico (igual que garrote) 	Linterna',
  'Enano minero 	Pico (igual que garrote) 	Linterna',
  'Enano pastor 	Bastón	Cerda**',
  'Esclavo 	Garrote 	Roca de extraño aspecto',
  'Escriba 	Dardo 	Pergamino, 10 hojas',
  'Escudero 	Espada larga 	Casco de hierro',
  'Escudero 	Espada larga 	Casco de hierro',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granjero* 	Horca (igual que lanza) 	Gallina**',
  'Granuja 	Palo (igual que garrote) 	Cuenco para limosnas',
  'Guardia de caravana 	Espada corta	Lino, 1 metro',
  'Herborista 	Garrote 	Hierbas, 1 libra',
  'Herrero 	Martillo (igual que garrote)	Tenaza de acero',
  'Huérfano 	Garrote 	Muñeco de trapo',
  'Joyero 	Daga 	Gema por valor de 20 po',
  'Jugador	Garrote	Dados',
  'Juglar 	Daga	Laúd',
  'Leñador	Hachuela	Hato de leña',
  'Leñador	Hachuela	Hato de leña',
  'Leñador	Hachuela	Hato de leña',
  'Mediano comerciante	Espada corta	20 pp ',
  'Mediano guantero	Lezna (igual que daga)	Guantes, 4 pares',
  'Mediano marinero	Cuchillo (igual que daga)	Lona, 2 metros',
  'Mediano pollero	Hachuela	Carne de pollo, 5 libras',
  'Mediano prestamista	Espada corta	5 po, 10 pp, 200 pc',
  'Mediano sastre	Tijeras (igual que daga)	Trajes de calidad, 3 conjuntos',
  'Mediano tintorero	Bastón	Tela, 3 yardas',
  'Mediano tintorero	Bastón	Tela, 3 yardas',
  'Mediano vagabundo 	Garrote	Cuenco para limosnas',
  'Mediano cíngaro	Honda	Muñeco vudú',
  'Mendicante	Garrote	Queso cremoso',
  'Mendigo de gremio	Honda	Muletas',
  'Mendigo de gremio	Honda	Muletas',
  'Mercader	Daga	4 po, 14 pp, 27 pc',
  'Mercenario	Espada larga	Armadura de pieles',
  'Molinero/panadero	Garrote	Harina, 1 libra',
  'Noble	Espada larga	Anillo de oro por valor 			de 10 po',
  'Paleador de excrementos	Paleta (igual que daga)	Saco de excrementos',
  'Pastor	Bastón	Perro pastor**',
  'Quesero	Porra (igual que bastón)	Queso apestoso',
  'Recaudador	Espada larga	100 pc',
  'Recaudador	Espada larga	100 pc',
  'Sacristán	Bastón	Símbolo sagrado',
  'Sepulturero	Pala (igual que bastón)	Paleta',
  'Siervo	Bastón	Medallón',
  'Soldado	Lanza	Escudo',
  'Tejedor	Daga	Traje de calidad',
  'Tonelero	Palanqueta (igual que garrote)	Barril',
  'Trampero	Honda	Piel de tejón',
  'Trampero	Honda	Piel de tejón',
  'Vendedor ambulante	Cuchillo (igual que daga)	Fruta',
  'Vidente	Daga	Tarot',
  'Zapatero	Lezna (igual que daga)	Calzador',
]

const puntuacionesDeCaracteristicas = () =>
  caracteristicas.reduce(
    (c, nombreCaracteristica) => {
      const dados = d6.roll(3)
      const valor = dados.reduce(
        (a, x) => a + x,
        0
      )
      const modificador =
        modificadoresPuntuacionCaracteristicas[
          valor - 1
        ]
      const caracteristica = {
        dados,
        valor,
        modificador,
      }
      return {
        [nombreCaracteristica]: caracteristica,
        ...c,
      }
    },
    {}
  )

export default (_, context, messenger) => {
  const caracteristicasPersonaje = puntuacionesDeCaracteristicas()
  const puntuacionSuerte = d30.roll()
  const tiradaPuntosDeGolpe = d4.roll()
  const tiradaPiesasDeCobre = d12.roll(5)
  const piesasDeCobre = tiradaPiesasDeCobre.reduce(
    (a, x) => a + x,
    0
  )
  const tiradaPiesasDeEquipo = d24.roll()
  const tiradaOficio = d100.roll()
  let puntosDeGolpe =
    tiradaPuntosDeGolpe +
    caracteristicasPersonaje.vigor.modificador
  puntosDeGolpe =
    puntosDeGolpe <= 1 ? 1 : puntosDeGolpe

  messenger.send(
    'cdm character',
    {
      caracteristicasPersonaje,
      puntuacionSuerte: `${puntuacionSuerte}: ${
        puntuacionDeSuerte[puntuacionSuerte - 1]
      }`,
      tiradaPuntosDeGolpe,
      puntosDeGolpe,
      tiradaPiesasDeCobre,
      piesasDeCobre,
      tiradaPiesasDeEquipo: `${tiradaPiesasDeEquipo}: ${
        equipo[tiradaPiesasDeEquipo - 1]
      }`,
      tiradaOficio: `${tiradaOficio}: ${
        oficios[tiradaOficio - 1]
      }`,
      caracteristicas,
    },
    context
  )
}
