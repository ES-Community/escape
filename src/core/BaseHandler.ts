import { Message, Client } from 'discord.js'
import { LowdbSync } from 'lowdb'
import Kernel from './Kernel'

interface BaseHandlerConstructor {
  listenOn: string[]
  new (database: LowdbSync<any>, ...args: any[]): BaseHandler
}

class BaseHandler {
  /**
   * The database instance.
   */
  protected db: LowdbSync<any>

  /**
   * The triggered event.
   */
  protected event: String;

  /**
   * The context of the message sent.
   */
  protected args: any

  /**
   * The Discord.js client.
   */
  protected client: Client

  constructor (database: LowdbSync<any>, event: String, ...args: any[]) {
    this.db = database
    this.event = event
    this.args = args
    this.client = Kernel.instance.getClient()
  }

  public handle () {
  }
}

export default BaseHandler
export { BaseHandlerConstructor }
