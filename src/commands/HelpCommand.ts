import { RichEmbed } from 'discord.js'
import BaseCommand from '../core/BaseCommand'
import Kernel from '../core/Kernel'

class HelpCommand extends BaseCommand {
  static commandName = 'help'
  static description = 'Affiche la liste des commandes.'

  handle () {
    const embed = new RichEmbed()

    embed.setTitle('Liste des commandes')
      .setColor('#63b3ed')
     
    Kernel.instance.getCommands().forEach(command => {
      const x = command.args.reduce((prev, curr) => `${prev} ${curr.required ? '<' : '['}${curr.name}:${curr.type}${curr.required ? '>' : ']'}`, '')
      embed.addField(`!${command.commandName} ${x}`, `- ${command.description}`)
    })

    this.send(embed)
  }
}

export default HelpCommand
