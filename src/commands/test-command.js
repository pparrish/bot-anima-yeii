/* eslint-disable no-await-in-loop */
import { CharacterCreator } from '../anima'
import getMessageFromUser from '../utils/getMessageFromUser'

export default async (_, context, messenger) => {
  const creator = new CharacterCreator()
  let text = 'Creación de personajes.'
  messenger.send('raw', { text }, context)
  const gn = async () =>
    getMessageFromUser(() => true, {
      id: context.author.id,
      collectorChannel: context.collectorChannel,
    })
  // Generate types
  text = `1 - *Aleatorio con ventaja* : Método preferido para personajes de jugadores.
2 - **Aleatorio con riesgo** : Puede crear personajes con características muy bajas.
3 - **Aleatorio** : Para npc's y personajes comunes.

Elije un tipo de generación escribiendo 1, 2 o 3...
`
  messenger.send('raw', { text }, context)

  let choise = await gn()
  choise = Number(choise)
  creator.generateRolls.select(choise)
  await messenger.send(
    'roll-generator-type',
    creator.data.generatedRolls.generated[choise],
    context
  )
  const nonSetted = [
    'fuerza',
    'destreza',
    'agilidad',
    'constitución',
    'inteligencia',
    'poder',
    'voluntad',
    'percepción',
  ]
  const setted = []

  const translations = {
    fuerza: 'strength',
    destreza: 'dexterity',
    agilidad: 'agility',
    constitución: 'physique',
    inteligencia: 'inteligence',
    poder: 'power',
    voluntad: 'will',
    percepción: 'perception',
  }

  const traduce = {
    strength: 'fuerza',
    dexterity: 'destreza',
    agility: 'agilidad',
    physique: 'constitución',
    inteligence: 'inteligencia',
    power: 'poder',
    will: 'voluntad',
    perception: 'percepción',
  }
  await messenger.send(
    'raw',
    {
      text: `Selecciona tus características por prioridad, puedes elegir entre: ${nonSetted}`,
    },
    context
  )
  while (nonSetted.length > 0) {
    let res = await gn()
    res = res.toLowerCase()

    const getBiggestValue = arr =>
      arr.reduce((acc, next) =>
        acc > next ? acc : next
      )

    if (nonSetted.includes(res)) {
      const bigest = getBiggestValue(
        creator.data.pointsShop.values.stock
      )
      setted.push()
      nonSetted.splice(nonSetted.indexOf(res), 1)
      creator.characteristicsSelection.select(
        translations[res],
        bigest
      )
      await messenger.send(
        'raw',
        {
          text: `${res}: ${bigest}
Por elegir: ${nonSetted}`,
        },
        context
      )
    }
  }
  // Get all enumerated characteristics
  await messenger.send(
    'raw',
    {
      text: `Estas son tus características`,
    },
    context
  )
  creator.data.characteristics.forEach(
    characteristic => {
      messenger.send(
        'raw',
        {
          text: `${
            traduce[characteristic.name]
          }: ${characteristic.value}`,
        },
        context
      )
    }
  )

  // appearance
  messenger.send(
    'raw',
    {
      text: `Lo siguiente es seleccionar las características secundarias de tu personaje.`,
    },
    context
  )
  // message appearance
  messenger.send(
    'raw',
    {
      text: `Tu apariencia actual es ${
        creator.data.secondaryCharacteristics.get(
          'appearance'
        ).value
      } escribe ok o un numero del 1 al 10 para seleccionar tu apariencia`,
    },
    context
  )

  // select appearance
  choise = await gn()

  if (!Number.isNaN(choise)) {
    choise = Number(choise)
    if (choise >= 1 || choise <= 10)
      creator.physicalAttibutesSelector.selectApareance(
        choise
      )
  }

  // select body type
  messenger.send(
    'raw',
    {
      text: `Vamos a decidir la altura y peso de tu personaje, escribe normal o pequeño si es que quieres acceder a un rango menor de altura y peso`,
    },
    context
  )

  choise = await gn()

  if (choise === 'pequeño') {
    creator.physicalAttibutesSelector.selectBodyType(
      'slim'
    )
  }

  const {
    bodyLimits,
  } = creator.physicalAttibutesSelector
  // select weight
  messenger.send(
    'raw',
    {
      text: `Escribe la altura de tu personaje, puedes elegir entre ${bodyLimits.height.from} y ${bodyLimits.height.to}`,
    },
    context
  )

  choise = await gn()

  if (!Number.isNaN(choise)) {
    const { from, to } = bodyLimits.height
    choise = Number(choise)
    if (choise >= from || choise <= to)
      creator.physicalAttibutesSelector.selectHeight(
        choise
      )
  }

  // select height
  messenger.send(
    'raw',
    {
      text: `Escribe el peso de tu personaje, puedes elegir entre ${bodyLimits.weight.from} y ${bodyLimits.weight.to}`,
    },
    context
  )

  choise = await gn()

  if (!Number.isNaN(choise)) {
    const { from, to } = bodyLimits.weight
    choise = Number(choise)
    if (choise >= from || choise <= to)
      creator.physicalAttibutesSelector.selectWeight(
        choise
      )
  }

  messenger.send(
    'raw',
    {
      text: `Listo, tus características secundarias son
      tipo de movimiento : ${
        creator.data.physicalCapacities.get(
          'movement type'
        ).value
      }
      cansancio : ${
        creator.data.physicalCapacities.get(
          'fatigue'
        ).value
      }
      tamaño : ${
        creator.data.secondaryCharacteristics.get(
          'size'
        ).value
      }
      apariencia : ${
        creator.data.secondaryCharacteristics.get(
          'appearance'
        ).value
      }
      altura : ${creator.data.body.weight}
      peso : ${creator.data.body.height}
      `,
    },
    context
  )

  const categories = [
    'guerrero',
    'guerrero acrobata',
    'paladín',
    'paladín oscuro',
    'maestro de armas',
  ]
  const transCategories = [
    'warrior',
    'acrobat warrior',
    'paladín',
    'dark paladin',
    'weapon master',
  ]

  return false
}
