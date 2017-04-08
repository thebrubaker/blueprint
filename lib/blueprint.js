import CoreBlueprint from './core'
import { driver } from './symbols'

export default class Blueprint extends CoreBlueprint {

  /**
   * Fetch a model by it's key.
   * @param  {string} key  The key to fetch.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (key) {
    return this[driver].fetch(key)
  }

  /**
   * Create a model with a payload and an optional custom key.
   * @param  {object} payload  The payload to send.
   * @param  {string} key  A custom key for the new model.
   * @return {Promise}  A promise that resolves with the created model.
   */
  create (payload, key = '') {
    return this[driver].create(payload, key)
  }

  /**
   * Update a model by it's key and with a payload.
   * @param  {string} key  The key to update.
   * @param  {object} payload  The payload to send.
   * @return {Promise}  A promise that resolves with the model.
   */
  update (key, payload) {
    return this[driver].update(key, payload)
  }

  /**
   * Delete a model by it's key.
   * @param  {string} key  The key to delete.
   * @return {Promise}  A promise that resolves with a boolean.
   */
  delete (key) {
    return this[driver].delete(key)
  }
}
