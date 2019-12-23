const CommandManager = require('./commandManager.js')
describe('commandManager', () => {
  describe('Constructor', () => {
    test('Must be return a object', () => {
      let result = new CommandManager()
      expect(typeof result).toBe('object')
    })
  })
  describe('commandsList', () => {
    test('In a empty command manager must return emty array', () => {
      let result = new CommandManager().commandsList()
      expect(result).toEqual([])
    })
  })
  describe('addComand', () => {
    test('Add a comand', () => {
      let commanToAdd = { name: 'foo' }
      let result = new CommandManager().addComand(commanToAdd).commandsList()
      expect(result).toEqual(['foo'])
    })
  })
  describe('addCommands', () => {
    test('Slould get a list of two commands afther adding them', () => {
      let cm = new CommandManager()
      let commands = [
        { name: 't' },
        { name: 'ts' }
      ]
      let result = cm.addComands(commands).commandsList()
      expect(result).toEqual(['t', 'ts'])
    })
  })
  describe('A command manager with one not option command ', () => {
    let commanderOptions = {
      prefix: '.',
      commands: [
        {
          name: 'h',
          resolver: x => 1
        }
      ]
    }
    let cm = new CommandManager(commanderOptions)
    test('".h foo 20" When executing the command that does not have options with options should run normally', () => {
      let result = cm.exec('.h foo 20')
      expect(result).toBe(1)
    })
  })
  describe('A command manager with one command', () => {
    let mockyResolver = jest.fn((x) => ({ [x.habilityName]: x.habilityValue }))
    let commanderOptions = {
      prefix: '.',
      commands: [
        {
          name: 'ts',
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
          resolver: mockyResolver
        }
      ]
    }
    let cm = new CommandManager(commanderOptions)
    test('".ts foo 20" get foo:20 for test', () => {
      let result = cm.exec('.ts foo 20')
      expect(result).toEqual({ 'foo': '20' })
    })
    test('Sould have one command "ts"', () => {
      let result = cm.commandsList()
      expect(result).toEqual(['ts'])
    })
    test('The resolver must be called', () => {
      cm.exec('.ts foo 20')
      expect(mockyResolver).toHaveBeenCalled()
    })
  })
  describe('A command manager with two command', () => {
    let mockyResolver = jest.fn((x) => ({ [x.habilityName]: x.habilityValue }))
    let commanderOptions = {
      prefix: '.',
      commands: [
        {
          name: 'ts',
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
          resolver: mockyResolver
        },
        {
          name: 't',
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
          resolver: mockyResolver
        }
      ]
    }
    let cm = new CommandManager(commanderOptions)
    test('".t foo 20" get foo:20 for test', () => {
      let result = cm.exec('.ts foo 20')
      expect(result).toEqual({ 'foo': '20' })
    })
    test('Sould have one command "t"', () => {
      let result = cm.commandsList()
      expect(result).toEqual(['ts', 't'])
    })
    test('The resolver must be called', () => {
      cm.exec('.t foo 20')
      expect(mockyResolver).toHaveBeenCalled()
    })
  })
})
