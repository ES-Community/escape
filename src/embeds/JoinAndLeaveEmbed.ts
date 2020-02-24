import { RichEmbed } from 'discord.js'

class JoinAndLeaveEmbed extends RichEmbed {
  constructor (username: String, joining: boolean) {
    super()

    this.setTitle(joining ? 'Nouveau membre' : 'Membre parti')
      .setDescription(`${username} est ${joining ? 'arrivé' : 'parti'}.`)
      .setColor(joining ? 'GREEN' : 'RED')
  }
}

export default JoinAndLeaveEmbed
