import AbilityDice from '../dices/AbilityDice'

const dice = new AbilityDice()

const P = { '1': -125, '2': -100, '3': -75 }

function rollParticipantsInitiative(
  participants
) {
  return participants.map(participant => {
    const diceResult = dice.roll()
    if (diceResult.type === 'blunder') {
      diceResult.total = P[diceResult.history[0]]
    }
    participant.diceResult = diceResult
    participant.initiative =
      diceResult.total + participant.turn
    return participant
  })
}

const resolveInitiative = (
  { namesAndTurns = {} },
  context,
  messenger
) => {
  console.log(namesAndTurns)
  let participants = rollParticipantsInitiative(
    Object.entries(namesAndTurns).reduce(
      (arr, participant) => [
        ...arr,
        {
          name: participant[0],
          turn: Number.isNaN(participant[1]) ||
          participant[1] === true ||
          participant[1] === false ? 0 : participant[1],
          surpriceTo: [],
        },
      ],
      []
    )
  )

  participants.map(participant => {
    messenger.send(
      'roll',
      {
        sheet: {
          name: participant.name,
        },
        total: participant.initiative,
        history: participant.diceResult.history,
        type: participant.diceResult.type,
        calc: `${participant.turn}`,
        facepalm : false
      },
      context
    )
  })

  participants = participants.sort((a, b) =>
    a.initiative === b.initiative
      ? Math.random() < 0.5
        ? 1
        : -1
      : a.initiative < b.initiative
      ? 1
      : -1
  )

  participants.map(participant =>
    participants.map(p =>
      participant.initiative - p.initiative >= 150
        ? participant.surpriceTo.push(p)
        : false
    )
  )

  messenger.send(
    'initiative',
    participants,
    context
  )
}

const message = {
  name: 'initiative',
  resolver: (participants, { channel }) => {
    let message = '🧦 **Iniciatva**\n ========='
    participants.map(participant => {
      message += `
**${participant.name}**
Resultado: **${participant.initiative}**${
        participant.surpriceTo.length === 0
          ? ''
          : `\nSorprendio a : \`${participant.surpriceTo.map(
              x => x.name
            )}\`\n`
      }
----------`
    })
    channel.send(message)
  },
}
export default {
  messages: [message],
  resolvers: {
    resolveInitiative,
  },
}
