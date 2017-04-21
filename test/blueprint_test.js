/* eslint-disable */
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

  // it('aliases fetch, create, update and delete methods to the selected driver', () => {
  //   const model = {
  //     name: 'name',
  //     driver: 'driver'
  //   }
  //   const availableDrivers = {
  //     firebase: sinon.spy()
  //   }
  //   Blueprint.load(availableDrivers)
  //   const blueprint = new Blueprint(model)
  //   drivers.test.init = sinon.stub().returns(drivers.test)
  //   const payload = { foo: 'bar' }
  //   const blueprint = new Blueprint(options)
  //   blueprint.loadDrivers(drivers)
    
  //   blueprint.fetch(1)
  //   assert(drivers.test.fetch.called)
  //   assert(drivers.test.fetch.calledWith(1))

  //   blueprint.create(payload, 2)
  //   assert(drivers.test.create.called)
  //   assert(drivers.test.create.calledWith(payload, 2))

  //   blueprint.update(3, payload)
  //   assert(drivers.test.update.called)
  //   assert(drivers.test.update.calledWith(3, payload))

  //   blueprint.delete(4)
  //   assert(drivers.test.delete.called)
  //   assert(drivers.test.delete.calledWith(4))
  // })
})