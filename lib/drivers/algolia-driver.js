export default class AlgoliaBlueprintDriver {
  /**
   * Construct the Firebase Blueprint driver.
   * @param  {Blueprint} blueprint  The Blueprint model.
   * @return {FirebaseBlueprintDriver}  The driver.
   */
  constructor (blueprint) {
    this.blueprint = blueprint
  }

  /**
   * Load the algolia service into all instances of the driver.
   * @param {Algolia} algolia  A configured instance of the algolia service.
   */
  static load(algolia) {
    AlgoliaBlueprintDriver.prototype.algolia = algolia

    return AlgoliaBlueprintDriver
  }

  /**
  * Get the location from the blueprint.
  * @return {string}  The location.
  */
  get location () {
    return this.blueprint.config.location
  }

  /**
   * Return an index to the current model's location.
   * @return {Index}  An algolia index.
   */
  index () {
    return this.algolia.initIndex(this.location)
  }

  /**
   * Fetch data from the database by id.
   * @param  {string} id  The id of the model to be accessed.
   * @return {Object}  The model with the corresponding id.
   */
  fetch (id) {
    return new Promise((resolve, reject) => {
      this.index().getObject(id, (error, data) => {
        error ? reject(error) : resolve(data)
      })
    })
  }

  /**
   * Create a new model in the database.
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  create (data) {
    return new Promise((resolve, reject) => {
      this.index().addObject(data, null, (error, data) => {
        error ? reject(error) : resolve(data)
      })
    })
  }

  /**
   * Update a model in algolia.
   * @param  {string} id  The id of the model
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  update (id, data) {
    return new Promise((resolve, reject) => {
      this.index().partialUpdateObject({ objectID: id, ...data }, (error, data) => {
        error ? reject(error) : resolve(data)
      })
    })
  }

  /**
   * Delete a model from algolia.
   * @param  {string} id  The id of the model
   * @return {undefined}
   */
  delete (id) {
    return new Promise((resolve, reject) => {
      this.index().deleteObject(id, (error) => {
        error ? reject(error) : resolve(true)
      })
    })
  }
}
