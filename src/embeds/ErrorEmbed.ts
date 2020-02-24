import { RichEmbed } from 'discord.js'

class ErrorEmbed extends RichEmbed {
  constructor (message: string) {
    super()

    this.setColor('#fc8181')
      .setTitle('Oops')
      .setTimestamp()
      .setDescription(message)
  }
}

export default ErrorEmbed
