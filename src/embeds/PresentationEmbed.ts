import { RichEmbed, User } from 'discord.js'
import { MemberRequestContent } from '../handlers/MemberRequest'

class PresentationEmbed extends RichEmbed {
  constructor (user: User, memberRequest: Partial<MemberRequestContent>) {
    super()
    this.setTitle('Présentation')
      .setThumbnail(user.avatarURL)
      .addField(
        'Utilisateur',
        `<@${user.id}>`
      )
      .addField(
        'Métier',
        memberRequest.job
      )
      .addField(
        'Expériences et préférences',
        memberRequest.experience
      )
      .addField(
        'Profiles en ligne',
        memberRequest.devProfiles
      )
      .addField(
        'Pratique du JavaScript depuis',
        memberRequest.jsTime
      )
      .addField(
        'Découverte de la communauté',
        memberRequest.foundCommunity
      )
      .addField(
        'Commentaire libre',
        memberRequest.freeComment
      )
  }
}

export default PresentationEmbed
