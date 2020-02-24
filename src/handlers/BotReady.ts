import BaseHandler from '../core/BaseHandler'
import Kernel from '../core/Kernel'

class BotReady extends BaseHandler {
  static listenOn = ['ready']

  async handle () {
    const toPrint = []
    toPrint.push('ESCAPE READY')
    toPrint.push('\tCOMMANDS')
    Kernel.instance.getCommands().forEach((value, key) => {
      toPrint.push(`\t\t${key}`)
    })
    toPrint.push('\tHANDLERS')
    Kernel.instance.getHandlers().forEach((values, key) => {
      toPrint.push(`\t\t${key}`)
      values.forEach(value => toPrint.push(`\t\t\t${value}`))
    })
    toPrint.forEach(content => console.log(content))
    this.client.users.forEach(user => {
      if(!user.bot)
      this.client.emit('guildMemberAdd', user)
    })
  }
}

export default BotReady
