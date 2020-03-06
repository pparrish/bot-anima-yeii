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
  1,
  1,
  1,
  2,
  2,
  3,
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
      puntuacionSuerte,
      tiradaPuntosDeGolpe,
      puntosDeGolpe,
      tiradaPiesasDeCobre,
      piesasDeCobre,
      tiradaPiesasDeEquipo,
      tiradaOficio,
      caracteristicas,
    },
    context
  )
}
