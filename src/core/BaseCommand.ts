import { Message } from 'discord.js'
import { ArgumentTypes, CommandArgument } from './Contracts'
import { LowdbSync } from 'lowdb'

interface BaseCommandConstructor {
  args: CommandArgument[]
  commandName: String
  description: String
  $booted: Boolean
  $boot(): void
  $defineArgument(options: Partial<CommandArgument>): void
  new (database: LowdbSync<any>, message: Message): BaseCommand
}

type DecoratorArg = Partial<Pick<CommandArgument, Exclude<keyof CommandArgument, 'type'>>>

/**
 * Adds the argument to the list of command's arguments with pre-defined
 * type.
 */
function addArgument (type: ArgumentTypes, options: DecoratorArg) {
  return function arg (target: any, propertyName: string) {
    target.constructor.$boot()
    target.constructor.$defineArgument(Object.assign({ type, propertyName }, options))
  }
}

/**
 * Decorators.
 */
const args = {
  /**
   * Define argument that accepts string value
   */
  string (options?: Partial<CommandArgument>) {
    return addArgument('string', options || {})
  },

  /**
   * Define argument that accepts multiple values. Must be
   * the last argument.
   */
  spread (options?: Partial<CommandArgument>) {
    return addArgument('spread', options || {})
  },

  /**
   * Define argument that accepts number value
   */
  number (options?: Partial<CommandArgument>) {
    return addArgument('number', options || {})
  },

  /**
   * Define argument that is a mention
   */
  mention (options?: Partial<CommandArgument>) {
    return addArgument('mention', options || {})
  }
}

class BaseCommand {
  /**
   * The list of all arguments for this command.
   */
  public static args: CommandArgument[]

  /**
   * The name of the command.
   */
  public static commandName: String

  /**
   * The description of the command.
   */
  public static description: String

  /**
   * Whether or not the command has been booted.
   */
  public static $booted: boolean

  /**
   * The database instance.
   */
  protected db: LowdbSync<any>

  /**
   * The context of the message sent.
   */
  protected context: Message

  /**
   * Boots the command by defining required static properties.
   */
  public static $boot () {
    if (this.$booted) {
      return
    }

    this.$booted = true
    Object.defineProperty(this, 'args', { value: [] })

    if (!this.hasOwnProperty('commandName')) {
      Object.defineProperty(this, 'commandName', { value: '' })
    }
    if (!this.hasOwnProperty('description')) {
      Object.defineProperty(this, 'description', { value: '' })
    }
  }

  constructor (database: LowdbSync<any>, context: Message) {
    this.db = database
    this.context = context
  }

  /**
   * Add a new argument to the list of command arguments
   */
  public static $defineArgument (options: Partial<CommandArgument>) {
    if (!options.propertyName) {
      throw new Error('"propertyName" is required to register command argument')
    }

    const arg: CommandArgument = Object.assign({
      type: options.type || 'string',
      propertyName: options.propertyName,
      name: options.name || options.propertyName,
      required: options.required === false ? false : true,
    }, options)

    this.args.push(arg)
  }

  public send (message: any) {
    this.context.channel.send(message)
  }

  public findChannel (id: string) {
    return this.context.client.channels.get(id)
  }

  public findMessage (id: string) {
    return this.context.channel.fetchMessage(id)
  }

  public handle () {
  }
}

export default BaseCommand
export { args, BaseCommandConstructor }
