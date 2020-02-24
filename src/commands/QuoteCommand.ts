import BaseCommand, { args } from '../core/BaseCommand'
import { RichEmbed } from 'discord.js'

class PongCommand extends BaseCommand {
  @args.string()
  public messageId: string

  static commandName = 'quote'
  static description = 'Cite un message.'

  async handle () {
    const message = await this.findMessage(this.messageId)
    const embed = new RichEmbed()

    embed
      .setDescription(message.content)
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.avatarURL)
      // @ts-ignore
      .setFooter(`Cité par ${this.context.author.tag} dans #${this.context.channel.name}`)

    this.send(embed)
    this.context.delete()
  }
}

export default PongCommand
