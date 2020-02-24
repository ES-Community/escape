/**
 * The types of arguments can be defined on a command.
 */
export type ArgumentTypes = 'string' | 'spread' | 'number' | 'mention'

/**
 * The shape of command argument.
 */
export type CommandArgument = {
  propertyName: string,
  name: string,
  type: ArgumentTypes,
  required: boolean,
}
