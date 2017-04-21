import AlgoliaDriver from '../lib/drivers/algolia-driver'
import chai from 'chai'
import sinon from 'sinon'

/* eslint no-console: 0 */
describe('AlgoliaDriver', () => {
  it('can load the algolia driver', () => { 
    let algolia = sinon.spy()
    AlgoliaDriver.load(algolia)
    let driver = new AlgoliaDriver()
    chai.expect(driver).to.be.instanceof(AlgoliaDriver)
    chai.expect(driver.algolia).to.equal(algolia)
  })

  it('has methods for fetch, create, update and delete', () => { 
    let driver = new AlgoliaDriver()
    chai.expect(driver.fetch).to.exist
    chai.expect(driver.create).to.exist
    chai.expect(driver.update).to.exist
    chai.expect(driver.delete).to.exist
  })
})