import CoreBlueprint from '../lib/core'
import Blueprint from '../lib/blueprint'
import FirebaseDriver from '../lib/drivers/firebase-driver'
import { name, location, embeds, hasMany, config, driver, drivers } from '../lib/symbols'
import assert from 'assert'
import sinon from 'sinon'

describe('Blueprint', () => {

  it('can be constructed', () => {
    const model = {
      name: 'name',
      driver: 'firebase'
    }
    const availableDrivers = {
      firebase: FirebaseDriver
    }
    Blueprint.load(availableDrivers)
    const blueprint = new Blueprint(model)
    assert(blueprint instanceof Blueprint)
    assert(blueprint instanceof CoreBlueprint)
  })

  it('loads a set of drivers', () => {
    const model = {
      name: 'name',
      driver: 'firebase'
    }
    const availableDrivers = {
      firebase: FirebaseDriver
    }
    Blueprint.load(availableDrivers)
    const blueprint = new Blueprint(model)
    assert.equal(blueprint[drivers], availableDrivers)
    assert(blueprint[driver] instanceof FirebaseDriver)
  })

  it('is configured with a model describing the blueprint', () => { 
    const model = {
      name: 'name',
      driver: 'firebase',
      location: 'location',
      embeds: 'embeds',
      hasMany: 'hasMany'
    }
    const availableDrivers = {
      firebase: FirebaseDriver
    }
    Blueprint.load(availableDrivers)
    const blueprint = new Blueprint(model)
    assert.equal(blueprint[name], 'name')
    assert.equal(blueprint[location], 'location')
    assert.equal(blueprint[embeds], 'embeds')
    assert.equal(blueprint[hasMany], 'hasMany')
    assert.equal(blueprint[config], model)
  })

  it('has methods for fetching, creating, updating and deleting models', () => {
    const model = {
      name: 'name',
      driver: 'firebase',
      location: 'location',
      embeds: 'embeds',
      hasMany: 'hasMany'
    }
    const availableDrivers = {
      firebase: FirebaseDriver
    }
    Blueprint.load(availableDrivers)
    const blueprint = new Blueprint(model)
    assert(typeof blueprint.fetch === 'function')
    assert(typeof blueprint.create === 'function')
    assert(typeof blueprint.update === 'function')
    assert(typeof blueprint.delete === 'function')
  })

  it('aliases fetch, create, update and delete methods to the selected driver', () => {
    const model = {
      name: 'name',
      driver: 'firebase',
      location: 'location',
      embeds: 'embeds',
      hasMany: 'hasMany'
    }
    const availableDrivers = {
      firebase: FirebaseDriver
    }
    sinon.stub(FirebaseDriver.prototype, 'fetch')
    sinon.stub(FirebaseDriver.prototype, 'create')
    sinon.stub(FirebaseDriver.prototype, 'update')
    sinon.stub(FirebaseDriver.prototype, 'delete')

    Blueprint.load(availableDrivers)
    const blueprint = new Blueprint(model)

    const payload = { foo: 'bar' }
    
    blueprint.fetch(1)
    assert(blueprint[driver].fetch.called)
    assert(blueprint[driver].fetch.calledWith(1))

    blueprint.create(payload, 2)
    assert(blueprint[driver].create.called)
    assert(blueprint[driver].create.calledWith(payload, 2))

    blueprint.update(3, payload)
    assert(blueprint[driver].update.called)
    assert(blueprint[driver].update.calledWith(3, payload))

    blueprint.delete(4)
    assert(blueprint[driver].delete.called)
    assert(blueprint[driver].delete.calledWith(4))
  })
})