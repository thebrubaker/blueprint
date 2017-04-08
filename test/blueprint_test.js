import CoreBlueprint from '../lib/core'
import Blueprint from '../lib/blueprint'
import { name, driverType, location, embeds, hasMany } from '../lib/symbols'
import assert from 'assert'

describe('Blueprint', () => {

  it('is configured with options describing the blueprint', () => {
    const config = {
      name: 'name',
      driver: 'driver',
      location: 'location',
      embeds: 'embeds',
      hasMany: 'hasMany'
    }
    const blueprint = new Blueprint(config)
    assert.equal(blueprint instanceof Blueprint, true)
    assert.equal(blueprint instanceof CoreBlueprint, true)
    assert.equal(blueprint[name], 'name')
    assert.equal(blueprint[driverType], 'driver')
    assert.equal(blueprint[location], 'location')
    assert.equal(blueprint[embeds], 'embeds')
    assert.equal(blueprint[hasMany], 'hasMany')
  })

  it('is has methods for fetching, creating, updating and deleting models', () => {
    const config = {
      name: 'name',
      driver: 'driver'
    }
    const blueprint = new Blueprint(config)
    assert.equal(typeof blueprint.fetch === 'function', true)
    assert.equal(typeof blueprint.create === 'function', true)
    assert.equal(typeof blueprint.update === 'function', true)
    assert.equal(typeof blueprint.delete === 'function', true)
  })
})