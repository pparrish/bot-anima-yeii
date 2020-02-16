import roll from './roll'

export default [
  {
    name: 'raw',
    resolver: ({ text = '' }, { channel }) => {
      if (text)
        channel.send(text, { split: true })
    },
  },
  roll,
]
