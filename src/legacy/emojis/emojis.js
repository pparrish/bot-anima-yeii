const { responceTo } = require('../utils/messagesHelpers')
const numberToEmoji = number => {
  let emojiNumbers = '0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣'.split(' ')
  return (number + '').split('').map(x => emojiNumbers[Number(x)])
}

const resultEmojiReact = responceTo(
  async (numbers, toResponce) => {
    if (isNaN(numbers)) { return }
    let anumbers = Math.abs(numbers)
    let emojiNumbers = numberToEmoji(anumbers)
    let repeated = []
    if (numbers < 0) emojiNumbers.unshift('⛔')
    emojiNumbers = emojiNumbers.map(x => {
      if (repeated.indexOf(x) !== -1) return '🔁'
      repeated.push(x)
      return x
    })
    for (let emoji of emojiNumbers) {
      await toResponce.react(emoji)
    }
    await toResponce.react('🤖')
  })

module.exports.numberToEmoji = numberToEmoji
module.exports.resultEmojiReact = resultEmojiReact
