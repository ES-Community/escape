import BaseHandler from '../core/BaseHandler'
import { Message, User, GuildMember, MessageReaction, TextChannel } from 'discord.js'
import WelcomeEmbed from '../embeds/WelcomeEmbed'
import ErrorEmbed from '../embeds/ErrorEmbed'
import PresentationEmbed from '../embeds/PresentationEmbed'

export enum MemberRequestState {
  COC,
  JOB,
  EXPERIENCE,
  DEV_PROFILES,
  JS_TIME,
  FOUND_COMMUNITY,
  FREE_COMMENT
}

export interface MemberRequestContent {
  state: MemberRequestState
  cocSnowflake: string,
  coc: boolean,
  job: string,
  experience: string,
  devProfiles: string,
  jsTime: string,
  foundCommunity: string,
  freeComment: string
}

class MemberRequest extends BaseHandler {
  static listenOn = ['guildMemberAdd', 'message', 'messageReactionAdd']
  static currentRequests = new Map<String, Partial<MemberRequestContent>>()

  async handle () {
    if(this.event === 'guildMemberAdd') {
      const member: GuildMember = this.args[0]
      await member.send(new WelcomeEmbed())

      const message = await member.send('As-tu lu le code de conduite ?') as Message
      message.react('✅')
      const memberRequest = this.getMemberRequest(member.id)
      memberRequest.cocSnowflake = message.id
      MemberRequest.currentRequests.set(member.id, memberRequest)
      return;
    }
    
    const message: Message = this.event === 'message'
    ? this.args[0]
    : this.args[0].message
    
    if(message.channel.type !== 'dm'
      || (this.event === 'message' && message.author.bot === true)) return
    
    const interactingUser: User = this.event === 'message' 
      ? this.args[0].author
      : this.args[1]
    
    const memberRequest: Partial<MemberRequestContent> = this.getMemberRequest(interactingUser.id)
    if(memberRequest.state === MemberRequestState.COC) {
      if(this.event === 'messageReactionAdd' && message.id === memberRequest.cocSnowflake) {
        await interactingUser.send('Veuillez répondre aux questions qui suivent (un seul message par réponse). Une fois ceci fait, un mentor de la communauté les lira et vous donnera les permissions nécessaires à l\'accès au reste du serveur. Note que ce que tu écris dans ta présentation est visible par les membres de la communauté.')
        await interactingUser.send('Quel est votre métier actuel ?')
        memberRequest.state++
      }
      return
    }

    switch (memberRequest.state) {
      case MemberRequestState.JOB:
        memberRequest.job = message.content
        await interactingUser.send('Décrivez votre expérience avec le développement et vos préférences en terme de langages et de technologies.')
        break
      case MemberRequestState.EXPERIENCE:
        memberRequest.experience = message.content
        await interactingUser.send('Avez-vous un profil GiHub, GitLab ou Bitbucket que vous souhaiteriez partager avec les membres de la communauté ?')
        break
      case MemberRequestState.DEV_PROFILES:
        memberRequest.devProfiles = message.content
        await interactingUser.send('Depuis combien de vous faites-vous du développement JavaScript ? (amateur ou professionnel)')
        break
      case MemberRequestState.JS_TIME:
        memberRequest.jsTime = message.content
        await interactingUser.send('Finalement, comment avez-vous découvert notre communauté ?')
        break
      case MemberRequestState.FOUND_COMMUNITY:
        memberRequest.foundCommunity = message.content
        await interactingUser.send('Avez-vous un commentaire supplémentaire à faire ?')
        break
      case MemberRequestState.FREE_COMMENT:
        memberRequest.freeComment = message.content
        await interactingUser.send('Merci beaucoup ! Un mentor validera votre présentation prochainement.')

        const presentationChannel = this.client.channels.get(process.env.PRESENTATION_CHANNEL_ID) as TextChannel
        presentationChannel.send(new PresentationEmbed(interactingUser, memberRequest))
        MemberRequest.currentRequests.delete(interactingUser.id)
        return
      default:
        interactingUser.send(new ErrorEmbed(`Etat invalide : ${memberRequest.state}`))
        break
    }

    memberRequest.state++
    MemberRequest.currentRequests.set(interactingUser.id, memberRequest)
  }

  getMemberRequest(memberId: String) {
    return MemberRequest.currentRequests.get(memberId) ?? {
      state: MemberRequestState.COC
    }
  }
}

export default MemberRequest
