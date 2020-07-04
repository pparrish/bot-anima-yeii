import messages from './messages'
import messagesAbility from './messagesAbility'
import resolver from './resolvers'
import AbilityDice from '../dices/AbilityDice'
import CharacteristicDice from '../dices/CharacteristicDice'

export default {
  messages: [messages, messagesAbility],
  resolvers: {
    ability: resolver(AbilityDice, 'roll'),
    characteristic: resolver(
      CharacteristicDice,
      'ability roll'
    ),
  },
}
