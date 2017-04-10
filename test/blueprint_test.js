import CoreBlueprint from '../lib/core'
import Blueprint from '../lib/blueprint'
import { name, driverType, location, embeds, hasMany, driver, config } from '../lib/symbols'
import assert from 'assert'
import sinon from 'sinon'

describe('Blueprint', () => {

  it('is configured with options describing the blueprint', () => {
    const options = {
      name: 'name',
      driver: 'driver',
      location: 'location',
      embeds: 'embeds',
      hasMany: 'hasMany'
    }
    const blueprint = new Blueprint(options)
    assert(blueprint instanceof Blueprint)
    assert(blueprint instanceof CoreBlueprint)
    assert.equal(blueprint[name], 'name')
    assert.equal(blueprint[driverType], 'driver')
    assert.equal(blueprint[location], 'location')
    assert.equal(blueprint[embeds], 'embeds')
    assert.equal(blueprint[hasMany], 'hasMany')
    assert.equal(blueprint[config], options)
  })

  it('has methods for fetching, creating, updating and deleting models', () => {
    const options = {
      name: 'name',
      driver: 'driver'
    }
    const blueprint = new Blueprint(options)
    assert(typeof blueprint.fetch === 'function')
    assert(typeof blueprint.create === 'function')
    assert(typeof blueprint.update === 'function')
    assert(typeof blueprint.delete === 'function')
  })

  it('loads a set of drivers', () => {
    const options = {
      name: 'name',
      driver: 'foo'
    }
    const drivers = {
      foo: {
        init: sinon.spy()
      }
    }
    const blueprint = new Blueprint(options)
    blueprint.loadDrivers(drivers)
    assert(drivers.foo.init.called)
    assert(drivers.foo.init.calledWith(blueprint))
  })

  it('sets a driver from the available drivers, and throws an exception if its invalid', () => {
    const options = {
      name: 'name',
      driver: 'foo'
    }
    const drivers = {
      foo: {}
    }
    drivers.foo.init = sinon.stub().returns(drivers.foo)
    const blueprint = new Blueprint(options)
    // Throws if no drivers have been loaded
    assert.throws(() => blueprint.setDriver('foo'))
    blueprint.loadDrivers(drivers)
    blueprint.setDriver('foo')
    assert.equal(blueprint[driverType], 'foo')
    assert.equal(blueprint[driver], drivers.foo)
    // Throws if an invalid driver is set
    assert.throws(() => blueprint.setDriver('bar'))
  })

  it('aliases fetch, create, update and delete methods to the selected driver', () => {
    const options = {
      name: 'name',
      driver: 'test'
    }
    const drivers = {
      test: {
        fetch: sinon.spy(),
        create: sinon.spy(),
        update: sinon.spy(),
        delete: sinon.spy(),
      }
    }
    drivers.test.init = sinon.stub().returns(drivers.test)
    const payload = { foo: 'bar' }
    const blueprint = new Blueprint(options)
    blueprint.loadDrivers(drivers)
    
    blueprint.fetch(1)
    assert(drivers.test.fetch.called)
    assert(drivers.test.fetch.calledWith(1))

    blueprint.create(payload, 2)
    assert(drivers.test.create.called)
    assert(drivers.test.create.calledWith(payload, 2))

    blueprint.update(3, payload)
    assert(drivers.test.update.called)
    assert(drivers.test.update.calledWith(3, payload))

    blueprint.delete(4)
    assert(drivers.test.delete.called)
    assert(drivers.test.delete.calledWith(4))
  })
})