const CommandManager = require('./commands/commandManager.js')
const tablas = require('./tables')
const parsers = require('./commands/parsers')
const {
  saveValueInUser,
  helpResponse,
  sendIssue,
  t10,
  t10WithAutodetect,
  t100,
  t100WithAutodetect,
  deleteValueInUser
} = require('./resolvers')

module.exports = new CommandManager({
  prefix: '.',
  commands: [
    {
      name: 'gv',
      options: {
        'habilityName': {
          scope: 'first',
          mode: 'consume'
        },
        'habilityValue': {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: saveValueInUser
    },
    {
      name: 'bv',
      options: {
        'habilityName': {
          scope: 'first',
          mode: 'consume'
        }
      },
      resolver: deleteValueInUser
    },
    {
      name: 'h',
      resolver: helpResponse
    },
    {
      name: '###issue###',
      options: {
        'message': {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: sendIssue
    },
    {
      name: 't',
      options: {
        'options': {
          scope: parsers.getPrefixedOptions,
          mode: 'consume'
        },
        'variables': {
          scope: parsers.getVariables,
          mode: false
        },
        'calc': {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: t100WithAutodetect
    },
    {
      name: 'tc',
      options: {
        'options': {
          scope: parsers.getPrefixedOptions,
          mode: 'consume'
        },
        'variables': {
          scope: parsers.getVariables,
          mode: false
        },
        'calc': {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: t100
    },
    {
      name: 'd',
      options: {
        'options': {
          scope: parsers.getPrefixedOptions,
          mode: 'consume'
        },
        'variables': {
          scope: parsers.getVariables,
          mode: false
        },
        'calc': {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: t10WithAutodetect
    },
    {
      name: 'dd',
      options: {
        'options': {
          scope: parsers.getPrefixedOptions,
          mode: 'consume'
        },
        'variables': {
          scope: parsers.getVariables,
          mode: false
        },
        'calc': {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: t10
    },
    {
      name: 'tb',
      options: {
        querry: {
          scope: 'rest',
          mode: 'consume'
        }
      },
      resolver: tablas.command
    }
  ]
})
