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
    rich.setTitle(
      `Personaje nivel 0
+++++++++++++++++++++++++++++`
    )
    caracteristicas.map(x => {
      const c = caracteristicasPersonaje[x]
      rich.addField(
        `____\n${x}\n==============================`,
        `🎲: \`${c.dados}\`
valor: ${c.valor}
modificador: ${c.modificador}`
      )
      return 0
    })
    rich.addField(
      '____\n🍀 Suerte:' +
        '\n==============================',
      puntuacionSuerte
    )
    rich.addField(
      '____\n👊 Puntos de golpe:' +
        '\n==============================',
      `🎲: \`${tiradaPuntosDeGolpe}\`
valor: ${puntosDeGolpe}`
    )
    rich.addField(
      '____\n💰 Piesas de cobre' +
        '\n==============================',
      `🎲: \`${tiradaPiesasDeCobre}\`
valor: ${piesasDeCobre}`
    )
    rich.addField(
      '____\n📰 Oficio:' +
        '\n==============================',
      tiradaOficio
    )
    rich.addField(
      '____\n📦 Equipo:' +
        '\n==============================',
      tiradaPiesasDeEquipo
    )
    rich.setFooter(
      '\n_________________________________________________'
    )

    channel.send(author, rich)
  },
}
