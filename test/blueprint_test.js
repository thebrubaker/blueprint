import CoreBlueprint from '../lib/core'
import Blueprint from '../lib/blueprint'
import { name, driverType, location, embeds, hasMany, drivers, driver, config } from '../lib/symbols'
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
    const driverSet = {
      foo: sinon.spy()
    }
    const blueprint = new Blueprint(options)
    blueprint.loadDrivers(driverSet)
    assert.equal(blueprint[drivers], driverSet)
  })

  it('sets a driver from the available drivers, and throws an exception if its invalid', () => {
    const options = {
      name: 'name',
      driver: 'foo'
    }
    const driverSet = {
      foo: sinon.spy()
    }
    const blueprint = new Blueprint(options)
    // Throws if no drivers have been loaded
    assert.throws(() => blueprint.setDriver('foo'))
    blueprint.loadDrivers(driverSet)
    blueprint.setDriver('foo')
    assert.equal(blueprint[driverType], 'foo')
    assert.equal(blueprint[driver], driverSet.foo)
    // Throws if an invalid driver is set
    assert.throws(() => blueprint.setDriver('bar'))
  })
})