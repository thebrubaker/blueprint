import ApiDriver from '../lib/drivers/api-driver'
import chai from 'chai'
import sinon from 'sinon'

/* eslint no-console: 0 */
describe('ApiDriver', () => {
  it('can load the api driver', () => { 
    let api = sinon.spy()
    ApiDriver.load(api)
    let driver = new ApiDriver()
    chai.expect(driver).to.be.instanceof(ApiDriver)
    chai.expect(driver.api).to.equal(api)
  })

  it('has methods for fetch, create, update and delete', () => { 
    let driver = new ApiDriver()
    chai.expect(driver.fetch).to.exist
    chai.expect(driver.create).to.exist
    chai.expect(driver.update).to.exist
    chai.expect(driver.delete).to.exist
  })
})