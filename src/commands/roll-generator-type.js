import { RollsGenerator } from '../anima'

export default ({ type }, context, messenger) => {
  if (!type)
    return messenger.send(
      'raw',
      {
        text:
          'Debes seleccionar un tipo del 1 al 4\n```.generar-tirada-tipo <1,2,3,4>```',
      },
      context
    )
  const typeNumber = Number(type)
  if (
    Number.isNaN(type) ||
    typeNumber <= 0 ||
    typeNumber >= 5
  )
    return messenger.send(
      'raw',
      {
        text: `${type}, no existe, este comando solo admite los numeros del 1 al 4`,
      },
      context
    )
  const generator = new RollsGenerator(8, 60)
  return messenger.send(
    'roll-generator-type',
    generator.generate(typeNumber),
    context
  )
}
