import { Client, Intents } from 'discord.js'
import AnimaStorage from '../storage/AnimaStorage'
import managerToDiscordOptions from '../utils/managerToDiscordOptions'

const FLAGS = [
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILDS,
]

const client = new Client({
  intents: FLAGS,
  partials: ['CHANNEL'],
})

client.once('ready', () => {
  /* eslint-disable no-console */
  console.log('------bot ready-------')
})

process.on('exit', () => {
  client.destroy()
})

export default {
  client,
  init: (discordToken, commandManager) => {
    client.login(discordToken)

    client.on(
      'interactionCreate',
      (interaction) => {
        if (!interaction.isCommand()) return
        if (interaction.user.bot) {
          return
        }
        const context = {
          author: interaction.user,
          channel: interaction.channel,
          storage: new AnimaStorage(
            interaction.user.id
          ),
        }
        const { options } = interaction

        const query =
          options.getString('busqueda')
        const message =
          options.getString('mensaje')
        const variableName =
          options.getString('nombre')
        const variableValue =
          options.getNumber('valor')
        const pifia = options.getBoolean('pifia')
        const abierta =
          options.getBoolean('abierta')
        const rpifia = options.getNumber('rpifia')
        const rabierta =
          options.getNumber('rabierta')
        const calc = options.getString('calc')
        const force = options.getBoolean('forzar')
        const helpCommando =
          options.getString('commando')
        const mod = options.getString(
          'modificador'
        )
        const generationType =
          options.getString('tipo')
        const points = options.getString('puntos')
        const finalAttack =
          options.getNumber('ataque')
        const finalDefence =
          options.getNumber('defensa')
        const armorType = options.getNumber('ta')
        const weaponDamage =
          options.getNumber('daño')

        const command = `.${
          interaction.commandName
        } ${finalAttack ?? ''} ${
          weaponDamage ?? ''
        } ${finalDefence ?? ''} ${
          armorType ?? ''
        }  ${generationType ?? ''} ${mod ?? ''} ${
          points ?? ''
        } ${helpCommando ?? ''} ${query ?? ''} ${
          message ?? ''
        } ${variableName ?? ''} ${
          variableValue ?? ''
        } ${calc ?? ''} ${
          pifia ??
          abierta ??
          rpifia ??
          rabierta ??
          force ??
          undefined
            ? '?'
            : ''
        } ${
          abierta === null
            ? ''
            : `abierta=${abierta}`
        } ${
          rabierta === null
            ? ''
            : `rabierta=${rabierta}`
        } ${
          pifia === null ? '' : `pifia=${pifia}`
        } ${
          rpifia === null
            ? ''
            : `rpifia=${rpifia}`
        } ${force === null ? '' : `f=${force}`}`
          .replace(/\s+/g, ' ')
          .trim()

        console.log(command)
        interaction.reply(command)
        commandManager.exec(command, context)
      }
    )

    client.on(
      'messageCreate',
      async (message) => {
        if (!client.application?.owner)
          await client.application?.fetch()

        if (
          message.content.toLowerCase() ===
            '!deploy' &&
          message.author.id ===
            client.application?.owner.id
        ) {
          const data = managerToDiscordOptions(
            commandManager.commands
          )

          if (
            process.env.NODE_ENV === 'development'
          ) {
            await client.guilds.cache
              .get('560194891942985760')
              ?.commands.set(data)
          } else {
            await client.guilds.cache
              .get('560194891942985760')
              ?.commands.set([])
            await client.application?.commands.create(
              data
            )
          }
        }

        if (!message.author.bot) {
          const context = {
            author: message.author,
            channel:
              message.mentions.users.first()
                ? message.mentions.users.first()
                : message.channel,
            storage: new AnimaStorage(
              message.author.id
            ),
            attachments: message.attachments,
            collectorChannel: message.channel,
          }
          if (
            commandManager.isPrefixed(
              message.content
            ) &&
            process.env.NODE_ENV !==
              'development' &&
            message.author.id !==
              '483477752155209728'
          )
            context.storage.crud.increment(
              'used-commands',
              message?.guild?.name,
              message.content
            )
          const messageNonFirstMention =
            message.content.replace(/<.*>\s*/, '')
          commandManager.exec(
            messageNonFirstMention,
            context
          )
        }
        if (
          message.author.id ===
            '483477752155209728' &&
          message.content === '!!!!!stop'
        ) {
          client.destroy()
          process.exit(1)
        }
      }
    )
  },
}
