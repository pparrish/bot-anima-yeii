import { RichEmbed } from 'discord.js'

export default {
  name: 'cdm character',
  resolver: (
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
    { channel, author }
  ) => {
    const rich = new RichEmbed()
    rich.setTitle('Personaje nivel 0')
    caracteristicas.map(x => {
      const c = caracteristicasPersonaje[x]
      rich.addField(
        x,
        `tiradas: ${c.dados}
valor: ${c.valor}
modificador: ${c.modificador}`
      )
      return 0
    })
    rich.addField('Suerte:', puntuacionSuerte)
    rich.addField(
      'Puntos de golpe:',
      `tiradas: ${tiradaPuntosDeGolpe}
valor: ${puntosDeGolpe}`
    )
    rich.addField(
      'Piesas de cobre',
      `tiradas: ${tiradaPiesasDeCobre}
valor: ${piesasDeCobre}`
    )
    rich.addField('Oficio:', tiradaOficio)
    rich.addField('Equipo:', tiradaPiesasDeEquipo)

    channel.send(author, rich)
  },
}
