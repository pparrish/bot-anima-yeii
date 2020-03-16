/* eslint-disable no-param-reassign */
import { getCalculationWithUserVariables } from './utils'
import Life from '../anima/life'

const lifeOperators = {
  number: (
    { base, toAdd, selectedSheetName },
    { context, messenger }
  ) => {
    const newLife = new Life(base + toAdd)
    context.storage.life = newLife
    return messenger.send(
      'life setted',
      { selectedSheetName, newLife },
      context
    )
  },
  '=': (
    { base, toAdd, points, selectedSheetName },
    { context, messenger }
  ) => {
    if (points === '')
      return messenger.send(
        'life not points',
        undefined,
        context
      )
    const newLife = new Life(base + toAdd)
    context.storage.life = newLife
    return messenger.send(
      'life setted',
      { selectedSheetName, newLife },
      context
    )
  },
  '+': (
    { toAdd, life, points, selectedSheetName },
    { context, messenger }
  ) => {
    if (points === '')
      return messenger.send(
        'life not points',
        undefined,
        context
      )
    if (life.value === null)
      return messenger.send(
        'life is null',
        selectedSheetName,
        context
      )
    const newLife = life.increase(toAdd)
    context.storage.life = newLife
    return messenger.send(
      'life setted',
      { selectedSheetName, newLife },
      context
    )
  },
  '-': (
    { toAdd, life, points, selectedSheetName },
    { context, messenger }
  ) => {
    if (points === '')
      return messenger.send(
        'life not points',
        undefined,
        context
      )
    if (life.value === null)
      return messenger.send(
        'life is null',
        selectedSheetName,
        context
      )
    const newLife = life.decrease(toAdd)
    context.storage.life = newLife
    return messenger.send(
      'life setted',
      { selectedSheetName, newLife },
      context
    )
  },
  '%': (
    { toAdd, life, points, selectedSheetName },
    { context, messenger }
  ) => {
    if (points === '')
      return messenger.send(
        'life not points',
        undefined,
        context
      )
    if (life.value === null)
      return messenger.send(
        'life is null',
        selectedSheetName,
        context
      )
    const newLife = life.percent(toAdd)
    context.storage.life = newLife
    return messenger.send(
      'life setted',
      { selectedSheetName, newLife },
      context
    )
  },
  '+%': (
    { toAdd, life, points, selectedSheetName },
    { context, messenger }
  ) => {
    if (points === '')
      return messenger.send(
        'life not points',
        undefined,
        context
      )
    if (life.value === null)
      return messenger.send(
        'life is null',
        selectedSheetName,
        context
      )
    const newLife = life.increase(
      life.percent(toAdd).value
    )
    context.storage.life = newLife
    return messenger.send(
      'life setted',
      { selectedSheetName, newLife },
      context
    )
  },
  '-%': (
    { toAdd, life, points, selectedSheetName },
    { context, messenger }
  ) => {
    if (points === '')
      return messenger.send(
        'life not points',
        undefined,
        context
      )
    if (life.value === null)
      return messenger.send(
        'life is null',
        selectedSheetName,
        context
      )
    const newLife = life.decrease(
      life.percent(toAdd).value
    )
    context.storage.life = newLife
    return messenger.send(
      'life setted',
      { selectedSheetName, newLife },
      context
    )
  },
}
export default async (
  { points = '', mod, variables },
  context,
  messenger
) => {
  const modNumber = Number(mod)
  let toAdd = 0
  let base = 0
  const life = await context.storage.life
  const selectedSheetName = await context.storage
    .selectedSheetName
  if (mod === '' && points === '') {
    if (life.value === null)
      return messenger.send(
        'life is null',
        selectedSheetName,
        context
      )
    return messenger.send(
      'life actual',
      { life, selectedSheetName },
      context
    )
  }
  if (points !== '')
    toAdd = await getCalculationWithUserVariables(
      points,
      variables,
      context,
      messenger
    )

  if (toAdd === false) return false

  if (!Number.isNaN(modNumber)) {
    base = modNumber
  }
  try {
    lifeOperators[
      Number.isNaN(modNumber) ? mod : 'number'
    ](
      {
        base,
        toAdd,
        points,
        life,
        selectedSheetName,
      },
      { context, messenger }
    )
  } catch (e) {
    messenger.send(
      'raw',
      {
        text:
          'El modificador no existe, puedes usar los simbolos =, +, -, %, +% y -%',
      },
      context
    )
    return false
  }
  return true
}
