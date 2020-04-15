const secondaryAbilitiesList = require('../secondaryAbilities/listOfSecondaryAbilities')

module.exports = categoryCosts => {
  let secondaryAbilitiesCost = {}
  secondaryAbilitiesCost = secondaryAbilitiesList.reduce(
    (
      secondaryAbilitiesCost,
      secondaryAbility
    ) => {
      const { name } = secondaryAbility
      const { category } = secondaryAbility
      secondaryAbilitiesCost[name] =
        categoryCosts[category]
      return secondaryAbilitiesCost
    },
    secondaryAbilitiesCost
  )
  return secondaryAbilitiesCost
}
