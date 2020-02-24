import { User } from 'discord.js'
import BaseCommand, { args } from '../core/BaseCommand'

class AvatarCommand extends BaseCommand {
  @args.mention()
  user: User

  static commandName = 'avatar'
  static description = 'Affiche l\'avatar d\'un membre.'

  handle () {
    this.send(this.user.displayAvatarURL)
  }
}

export default AvatarCommand
