import { embeds, parent, location, id } from '../symbols'


export default class FirebaseBlueprintDriver {
  /**
   * Construct the Firebase Blueprint driver.
   * @param  {Blueprint} blueprint  The Blueprint model.
   * @return {FirebaseBlueprintDriver}  The driver.
   */
  constructor (blueprint) {
    this.blueprint = blueprint
  }

  /**
   * Set the firebase service on the driver's prototype
   * @param {Firebase} firebase  A configured instance of the firebase service.
   */
  static load(firebase) {
    FirebaseBlueprintDriver.prototype.firebase = firebase

    return this
  }

  /**
   * Get the ID from the blueprint.
   * @return {string}  The id / key of the model.
   */
  get id () {
    return this.blueprint[id]
  }

  /**
   * Get the location from the blueprint.
   * @return {string}  The location.
   */
  get location () {
    return this.blueprint[location]
  }

  /**
   * Get the parent from the blueprint.
   * @return {string}  The parent.
   */
  get parent () {
    return this.blueprint[parent]
  }

  /**
   * Get the location from the blueprint.
   * @return {string}  The location.
   */
  get embeds () {
    return this.blueprint[embeds]
  }

  /**
   * Link two blueprints together
   * @param  {Blueprint} blueprint  The blueprint to link to.
   * @return {Promise}  A promise that resolves with both blueprints.
   */
  link (blueprint) {
    return Promise.all([
      this.firebase.database()
        .ref(blueprint[location])
        .child(blueprint[id])
        .child(this.location)
        .child(this.id)
        .set(true),
      this.firebase.database()
        .ref(this.location)
        .child(this.id)
        .child(blueprint[location])
        .child(blueprint[id])
        .set(true)
    ])
  }

  /**
   * Save a newly created key to it's parent relationship.
   * @param  {string} key  The new key.
   * @param  {Blueprint} parent  The parent blueprint.
   * @return {Promise}  A promise that resolves when everything has been saved.
   */
  saveParentRelationship (key, parent) {
    return Promise.all([
      this.ref(key).child(parent[location]).set(parent[id]),
      this.firebase.database()
        .ref(parent[location])
        .child(parent[id])
        .child(this.location)
        .child(key)
        .set(true)
    ])
  }

  /**
   * Fetch data from the database by key.
   * @param  {string} key  The key of the model to be accessed.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (key) {
    return this.embeds.length
      ? this.populate(key)
      : this.once(key)
  }

  /**
   * Return the reference once.
   * @param  {string} key  The key to return on this blueprint.
   * @return {Promise}  Resolves with the model.
   */
  once (key) {
    return new Promise((resolve, reject) => {
      this.ref(key).once('value').then(snapshot => {
        if (!snapshot.val()) {
          reject(new Error(`${this.location}/${key} does not exist.`))
        }
        resolve(snapshot.val())
      })
    })
  }

  /**
   * Return the reference and populate it's children
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  populate (key) {
    return this.once(key).then(model => {
      let promises = this.embeds.map(name => this.fetchRelation(model, name))
      return Promise.all(promises).then(results => {
        this.embeds.forEach((name, key) => {
          model[name] = results[key]
        })
        return Promise.resolve(model)
      })
    })
  }

  /**
   * Fetch a relation on a model by name
   * @param  {object} model  The parent model.
   * @param  {string} name  The name of the relation to fetch.
   * @return {Promise}  A promise that resolves when all relations have been loaded.
   */
  fetchRelation (model, name) {
    if (typeof model[name] === 'string') {  // user.messages = -K!123091ljnaskdjnadf
      return this.firebase.database().ref(name).child(model[name]).once('value').then(snapshot => {
        return Promise.resolve(snapshot.val())
      })
    }
    let promises = Object.keys(model[name]).map(key => {
      return this.firebase.database().ref(name).child(key).once('value').then(snapshot => {
        return Promise.resolve(snapshot.val())
      })
    })
    return Promise.all(promises)
  }

  /**
   * Return a reference to the give model or a key for the given model.
   * @param  {string} key  A child reference.
   * @return {Reference}  A firebase reference.
   */
  ref (key) {
    return key
      ? this.firebase.database().ref(this.location).child(key)
      : this.firebase.database().ref(this.location)
  }

  /**
   * Create a new model in the database.
   * @param  {object} payload  The payload to send.
   * @param  {string} key  A custom key for the new model.
   * @return {Promise} Resolves with the newly created resource
   */
  create (data, customKey = null) {
    return this.ref(customKey).push(data).then(({ key }) => {
      if (this.parent) {
        this.saveParentRelationship(key, this.parent)
      }
      return this.fetch(key).then(attributes => {
        return Promise.resolve({ id: key, attributes })
      })
    })
  }

  /**
   * Update a model in the database.
   * @param  {string} key  The key to be saved.
   * @param  {Object} data  The data to be saved.
   * @return {Promise} Resolves with the newly created resource
   */
  update (key, updatedData) {
    return this.once(key)
      .then(data => this.ref(key).set({ ...data, ...updatedData }))
      .then(() => this.fetch(key))
  }

  /**
   * Delete a model by it's key.
   * @param  {string} key  The key of the model to be accessed.
   * @return {Promise}  A promise that resolves with void
   */
  delete (key) {
    return this.once(key).then(() => {
      return this.ref(key).remove()
    })
  }
}
