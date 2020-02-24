import BaseHandler from '../core/BaseHandler'
import { GuildMember, RichEmbed, TextChannel } from 'discord.js'
import Kernel from '../core/Kernel'
import JoinAndLeaveEmbed from '../embeds/JoinAndLeaveEmbed'

class JoinAndLeave extends BaseHandler {
  static listenOn = ['guildMemberAdd', 'guildMemberRemove']

  async handle () {
    const member: GuildMember = this.args[0][0]
    const isJoining = (member as any).deleted === false
    const channel = this.client.channels.get(process.env.LOGS_CHANNEL_ID) as TextChannel
    
    channel.send(new JoinAndLeaveEmbed(member.user.username, isJoining))
  }
}

export default JoinAndLeave
