import Blueprint from '../'
import chai from 'chai'

describe('Importing Blueprint', () => {
  it('has access to the packages drivers', () => {
    chai.expect(Blueprint.FirebaseDriver.name).to.equal('FirebaseBlueprintDriver')
    chai.expect(Blueprint.ApiDriver.name).to.equal('ApiBlueprintDriver')
    chai.expect(Blueprint.AlgoliaDriver.name).to.equal('AlgoliaBlueprintDriver')
  })
})
