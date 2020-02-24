import BaseCommand, { args } from '../core/BaseCommand'
import Database from '../core/Database'
import { User } from 'discord.js'

class WarnCommand extends BaseCommand {
  @args.mention()
  user: User

  static commandName = 'warn'

  handle () {
    // @ts-ignore
    this.db.get('warnedUsers').push(+this.user.id).write()
  }
}

export default WarnCommand
