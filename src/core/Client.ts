import { Client as DiscordClient, ClientOptions } from 'discord.js'

class Client extends DiscordClient {
  /**
   * Private key provided by Discord.
   *
   * You may find it in the developer portal.
   * @see https://discordapp.com/developers/applications
   */
  private $key: string

  constructor (key: string, options?: ClientOptions) {
    super(options)

    this.$key = key
  }

  /**
   * Connect your bot to all server it has joined.
   */
  public connect () {
    return this.login(this.$key)
  }
}

export default Client
