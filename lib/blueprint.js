const name = Symbol('name')
const namespace = Symbol('namespace')
const drivers = Symbol('drivers')
const driverType = Symbol('driverType')
// const driver = Symbol('driver')
const location = Symbol('location')
const embed = Symbol('embed')
const hasMany = Symbol('hasMany')
const parent = Symbol('parent')
const children = Symbol('children')
const id = Symbol('id')
const transformRequest = Symbol('transformRequest')
const transformResponse = Symbol('transformResponse')

export default class Blueprint {

  /**
   * Construct the blueprint
   * @param  {object} config  The blueprint configuration.
   * @return {Blueprint}  The new blueprint.
   */
  constructor (config) {
    this.bootDrivers()
    this.setConfiguration(config)
  }

  /**
   * Create the available drivers.
   * @return {Blueprint}  Returns this blueprint.
   */
  bootDrivers () {
    this[drivers] = {
      firebase: {},
      laravel: {}
    }

    return this
  }

  /**
   * Set the configuration for the blueprint.
   * @param {[type]} config [description]
   */
  setConfiguration (config) {
    this[id] = null
    this[name] = config.name
    this[namespace] = config.namespace
    this[location] = config.location
    this[driverType] = config.driver
    this[embed] = config.embed
    this[hasMany] = config.hasMany
    this[parent] = config.parent
    this[children] = config.children
    this[transformRequest] = config.transformRequest
    this[transformResponse] = config.transformResponse

    return this
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setId (value) {
    this[id] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {string}  The value.
   */
  getId () {
    return this[id]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setName (value) {
    this[name] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {string}  The value.
   */
  getName () {
    return this[name]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setNamespace (value) {
    this[namespace] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {string}  The value.
   */
  getNamespace () {
    return this[namespace]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setLocation (value) {
    this[location] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {string}  The value.
   */
  getLocation () {
    return this[location]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setDriverType (value) {
    this[driverType] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {string}  The value.
   */
  getDriverType () {
    return this[driverType]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setEmbed (value) {
    this[embed] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {object}  The value.
   */
  getEmbed () {
    return this[embed]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setHasMany (value) {
    this[hasMany] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {array}  The value.
   */
  getHasMany () {
    return this[hasMany]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setParent (value) {
    this[parent] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {Blueprint}  The value.
   */
  getParent () {
    return this[parent]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setChildren (value) {
    this[children] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {array}  The value.
   */
  getChildren () {
    return this[children]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setTransformRequest (value) {
    this[transformRequest] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @return {function}  The function.
   */
  getTransformRequest () {
    return this[transformRequest]
  }

  /**
   * Set the value to this key on the blueprint.
   * @param {string} value  This blueprint.
   * @return {Blueprint} This blueprint.
   */
  setTransformResponse (value) {
    this[transformResponse] = value

    return this
  }

  /**
   * Get the key from the blueprint
   * @param {function} value  The function.
   */
  getTransformResponse () {
    return this[transformResponse]
  }
}
