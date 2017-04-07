import Blueprint from '../'
import assert from 'assert'

describe('Blueprint', () => {
  it('accepts a configuration object as its only argument', () => {
    const config = {
      name: 'name',
      namespace: 'namespace',
      driver: 'driver',
      location: 'location',
      embed: 'embed',
      hasMany: 'hasMany',
      parent: 'parent',
      children: 'children',
      transformRequest: 'transformRequest',
      transformResponse: 'transformResponse'
    }
    const blueprint = new Blueprint(config)
    assert.equal(blueprint instanceof Blueprint, true)
    assert.equal(blueprint.getDriverType(), 'driver')
    assert.equal(blueprint.getName(), 'name')
    assert.equal(blueprint.getNamespace(), 'namespace')
    assert.equal(blueprint.getLocation(), 'location')
    assert.equal(blueprint.getEmbed(), 'embed')
    assert.equal(blueprint.getHasMany(), 'hasMany')
    assert.equal(blueprint.getParent(), 'parent')
    assert.equal(blueprint.getChildren(), 'children')
    assert.equal(blueprint.getId(), null)
    assert.equal(blueprint.getTransformRequest(), 'transformRequest')
    assert.equal(blueprint.getTransformResponse(), 'transformResponse')
  })
})