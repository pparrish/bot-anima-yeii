import prefixedValues from '../parsers/prefixedValues'
import variables from '../parsers/variables'

export default [
  {
    name: 't',
    resolver: (options, context, messenger) => {
      console.log(options)
      messenger.send(
        'raw',
        {
          text: 'message',
        },
        context
      )
      messenger.send(
        'roll',
        { text: options.test },
        context
      )
    },
    options: [
      {
        name: 'test',
        parser: prefixedValues('?'),
        consume: true,
      },
      {
        name: 'cosa',
        parser: variables,
        consume: false
      }
    ],
  },
]
