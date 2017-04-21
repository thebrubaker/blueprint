import { name, location, embeds, hasMany, config, driver, drivers } from './symbols'

/**
 * The core blueprint class. This is extended for specific types of blueprints.
 */
export default class CoreBlueprint {
  /**
   * Construct the blueprint.
   * @param  {Object} services  The services for loading a driver. Supports firebase, api and algolia.
   * @param  {Object} config  The model configuration for a blueprint.
   * @return {Blueprint}
   */
  constructor (model = {}) {
    if (model.name === undefined) {
      throw new BlueprintConfigError('The name must be configured for a blueprint. Did you forget to add the name property to your model?')
    }

    if (model.driver === undefined) {
      throw new BlueprintConfigError('The driver must be configured for a blueprint. Did you forget to add the driver property to your model?')
    }

    if (this[drivers] === undefined) {
      throw new BlueprintConfigError('No drivers have been loaded for Blueprint. Did you forget to call `Blueprint.load(drivers)`?')
    }

    this[config] = model
    this[name] = model.name
    this[location] = model.location || model.name
    this[embeds] = model.embeds || []
    this[hasMany] = model.hasMany || {}
    this[driver] = this.driver(model.driver)
  }

  /**
   * Load the drivers that will power blueprint.
   * @param  {Object} options  The available driver options.
   * @return {undefined}
   */
  static load (options) {
    CoreBlueprint.prototype[drivers] = options
  }

  /**
   * Create a new driver from the available drivers.
   * @param  {string} type  The type of driver to create.
   * @return {mixed}  An instance of the driver.
   */
  driver (type) {
    let Driver = this[drivers][type]

    return new Driver(this)
  }
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
