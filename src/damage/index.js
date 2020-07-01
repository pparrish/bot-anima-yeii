// Damage funtion, in the future must be a part of anima
// module
function damage(
  finalAtttack = 0,
  weaponDamage = 0,
  finalDefence = 0,
  armorType = 0
) {
  const asaultResult =
    finalAtttack -
    finalDefence -
    armorType * 10 -
    20
  return asaultResult > 10
    ? (Math.floor(asaultResult / 10) / 10) *
        weaponDamage
    : 0
}

export const messages = {
  damageResult: (aDamage, { channel }) => {
    channel.send(`⚔️ Daño: \`${aDamage}\``)
  },
}
export const commands = {
  calculateDamage(
    {
      finalAtttack = 0,
      finalDefence = 0,
      weaponDamage = 0,
      armorType = 0,
    } = {},
    context,
    messenger
  ) {
    const d = damage(
      finalAtttack,
      weaponDamage,
      finalDefence,
      armorType
    )
    messenger.send('damage result', d, context)
  },
}

export default {
  resolvers: {
    messages,
    commands,
  },
}
