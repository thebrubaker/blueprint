import FirebaseDriver from './drivers/firebase-driver'
import ApiDriver from './drivers/api-driver'
import AlgoliaDriver from './drivers/algolia-driver'
import { name, location, embeds, hasMany, config, driver, drivers, id, attributes, transformResponse, transformRequest, parent } from './symbols'

export default class Blueprint {
  /**
   * Construct the blueprint.
   * @param  {Object} model  The model configuration for a blueprint.
   * @return {Blueprint}
   */
  constructor (model = {}) {
    this.configure(model)
  }

  /**
   * Configure the blueprint with a model definition
   * @param  {Object} model  The model configuration
   * @return {undefined}
   */
  configure (model) {
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
    this[id] = null
    this[parent] = null
    this[attributes] = {}
    this[transformRequest] = model.transformRequest || function (data) { return data }
    this[transformResponse] = model.transformResponse || function (data) { return data }
    this[embeds] = model.embeds || []
    this[hasMany] = model.hasMany || []
    this[driver] = this.driver(model.driver)
  }

  /**
   * Return the firebase driver
   */
  static get FirebaseDriver () {
    return FirebaseDriver
  }

  /**
   * Return the firebase driver
   */
  static get ApiDriver () {
    return ApiDriver
  }

  /**
   * Return the firebase driver
   */
  static get AlgoliaDriver () {
    return AlgoliaDriver
  }

  /**
   * Load the drivers that will power blueprint.
   * @param  {Object} driverInstances  The available driver instances.
   * @return {undefined}
   */
  static load (driverInstances) {
    Blueprint.prototype[drivers] = driverInstances
  }

  /**
   * Fetch a model by it's key.
   * @param  {string} key  The key to fetch.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (key) {
    return this[driver].fetch(key).then(attributes => {
      let blueprint = new Blueprint(this[config])
      blueprint[id] = key
      blueprint.fill(attributes)
      
      return Promise.resolve(blueprint)
    })
  }

  /**
   * Create a model with a payload and an optional custom key.
   * @param  {object} payload  The payload to send.
   * @param  {string} key  A custom key for the new model.
   * @return {Promise}  A promise that resolves with the created model.
   */
  create (payload, customKey = null) {
    return this[driver].create(payload, customKey).then(({ key, attributes }) => {
      let blueprint = new Blueprint(this[config])
      blueprint[id] = key
      blueprint.fill(attributes)
      
      return Promise.resolve(blueprint)
    })
  }

  /**
   * An alias for create
   * @param  {object} payload  The data to push
   * @param  {string} customKey  A custom key for the new model.
   * @return {Promise}  A promise that resolves with the response
   */
  push (payload, customKey = '') {
    return this.create(payload, customKey)
  }

  /**
   * Update a model by it's key and with a payload.
   * @param  {string} key  The key to update.
   * @param  {object} payload  The payload to send.
   * @return {Promise}  A promise that resolves with the model.
   */
  update (key, payload) {
    return this[driver].update(key, payload).then(attributes => {
      let blueprint = new Blueprint(this[config])
      blueprint[id] = key
      blueprint.fill(attributes)
      
      return Promise.resolve(blueprint)
    })
  }

  /**
   * Delete a model by it's key.
   * @param  {string} key  The key to delete.
   * @return {Promise}  A promise that resolves with a boolean.
   */
  delete (key) {
    return this[driver].delete(key || this[id]).then(() => {
      let blueprint = new Blueprint(this[config])
      blueprint[id] = key
      blueprint.fill({})
      
      return Promise.resolve(blueprint)
    })
  }

  /**
   * Link two blueprints together
   * @param  {Blueprint} blueprint  The blueprint to link to.
   * @return {Promise}  A promise that resolves with both blueprints.
   */
  link (blueprint) {
    return this[driver].link(blueprint)
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

  /**
   * Set the relations on a model.
   */
  setRelations () {
    this[hasMany].forEach(relation => {
      this[relation] = (new Blueprint(relation)).belongsTo(this)
    })
  }

  /**
   * Set that the model belongs to another model as a relationship.
   * @param  {Blueprint} blueprint  The blueprint that is the parent.
   * @return {Blueprint}  This blueprint.
   */
  belongsTo (blueprint) {
    this[parent] = blueprint

    return this
  }

  /**
   * Push a relation onto the blueprint query.
   * @param  {string} relation  The relation.
   * @return {Blueprint}  The blueprint.
   */
  embed (relation) {
    if (this[embeds].indexOf(relation) === -1) {
      this[embeds].push(relation)
    }

    return this
  }

  /**
   * Fill the attributes of the blueprint.
   * @param  {object} attributes  The attributes to fill.
   * @return {Blueprint}  This blueprint.
   */
  fill (data) {
    this[attributes] = this[transformResponse](data)

    return this
  }

  /**
   * Get the attributes for the blueprint.
   * @return {object}  The attributes.
   */
  data () {
    return this[attributes]
  }

  /**
   * Return the attributes as JSON
   * @return {string}  The attributes as JSON
   */
  toJson (replacer, space) {
    return JSON.stringify(this[attributes], replacer, space)
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
