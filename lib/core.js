import configureBlueprint from './configure'
import { drivers, driverType } from './symbols'

/**
 * The core blueprint class. This is extended for specific types of blueprints.
 */
export default class CoreBlueprint {

  /**
   * Construct the blueprint.
   * @param  {object} config  The blueprint configuration.
   * @return {Blueprint}  The new blueprint.
   */
  constructor (config = {}) {
    configureBlueprint(this, config)
  }

  /**
   * Load an object of driver factories to power the blueprint.
   * @param  {object} factories  An object of driver factories.
   * @return {Blueprint}  This blueprint.
   */
  loadDrivers(factories) {
    this[drivers] = Object.keys(factories).reduce((drivers, key) => {
      drivers[key] = factories[key].load(this)
      return drivers
    }, {})

    return this
  }

  /**
   * Set the driver type.
   * @param {string} type  The driver type.
   * @throws {BlueprintDriverError}  If the driver type is invalid.
   * @return {Blueprint}  This blueprint.
   */
  setDriver (type) {
    if (this[drivers] === undefined) {
      throw new BlueprintDriverError('No drivers have been loaded for this blueprint. Did you forget to call loadDrivers()?')
    }

    if (this[drivers][type] === undefined) {
      throw new BlueprintDriverError(`The driver type is not available or valid: ${type}.`)
    }

    this[driverType] = type

    return this
  }
}

/**
 * An exception for setting an invalid driver.
 */
export class BlueprintDriverError extends Error {
  /**
   * Construct the error
   * @param  {string} message  The error message.
   * @return {BlueprintDriverError}  The Error.
   */
  constructor(message) {
    super(message)
    this.name = 'BlueprintDriverError'
  }
}
