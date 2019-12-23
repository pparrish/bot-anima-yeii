const dice = faces => faces()

const d10 = dice(() => 10)
const d100 = dice(() => 100)

const setDice = diceFaces => () => Math.floor(Math.random() * diceFaces + 1)

module.exports = {
  setDice,
  d10,
  d100
}
