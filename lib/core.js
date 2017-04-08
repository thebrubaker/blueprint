import configureBlueprint from './configure'
import { driver, drivers, driverType } from './symbols'

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
    this.setDriver(this[driverType])
  }

  /**
   * Set the driver type.
   * @param {string} type  The driver type.
   * @throws {BlueprintDriverError}  If the driver type is invalid.
   * @return {Blueprint}  This blueprint.
   */
  setDriver (type) {
    if (this[drivers][type] === undefined) {
      throw new BlueprintDriverError(`The driver type is not available or valid: ${type}.`)
    }

    this[driver] = this[drivers][type]

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
