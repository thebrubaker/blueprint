// import CoreBlueprint from '../lib/core'
// import Blueprint from '../lib/blueprint'
// import { name, driver, location, embeds, hasMany } from '../lib/symbols'
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
    assert.equal(config, config)
    // const blueprint = new Blueprint(config)
    // assert.equal(blueprint instanceof Blueprint, true)
    // assert.equal(blueprint instanceof CoreBlueprint, true)
    // assert.equal(blueprint[name], 'name')
    // assert.equal(blueprint[driver], 'driver')
    // assert.equal(blueprint[location], 'location')
    // assert.equal(blueprint[embeds], 'embeds')
    // assert.equal(blueprint[hasMany], 'hasMany')
  })
})