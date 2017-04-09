import { name, driverType, location, embeds, hasMany, config } from './symbols'

/**
 * Configure a blueprint.
 * @param  {Blueprint} blueprint  The blueprint to be configured.
 * @param  {object} options  The options to apply as configuration.
 * @throws {BlueprintConfigError}  If the config is invalid.
 * @return {Blueprint}  The configured blueprint.
 */
export default function configureBlueprint (blueprint, options) {
  if (options.name === undefined) {
    throw new BlueprintConfigError('The name option is required.')
  }

  if (options.driver === undefined) {
    throw new BlueprintConfigError('The driver option is required.')
  }

  blueprint[config] = options
  blueprint[name] = options.name
  blueprint[driverType] = options.driver
  blueprint[location] = options.location || options.name
  blueprint[embeds] = options.embeds || []
  blueprint[hasMany] = options.hasMany || {}

  return blueprint
}

/**
 * An exception for invalid configuration of a blueprint.
 */
export class BlueprintConfigError extends Error {
  /**
   * Construct the error
   * @param  {string} message  The error message.
   * @return {BlueprintConfigError}  The Error.
   */
  constructor(message) {
    super(message)
    this.name = 'BlueprintConfigError'
  }
}
