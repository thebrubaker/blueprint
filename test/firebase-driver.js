import FirebaseDriver from '../lib/drivers/firebase-driver'
import chai from 'chai'
import sinon from 'sinon'

/* eslint no-console: 0 */
describe('FirebaseDriver', () => {
  it('can load the firebase driver', () => { 
    let firebase = sinon.spy()
    FirebaseDriver.load(firebase)
    let driver = new FirebaseDriver()
    chai.expect(driver).to.be.instanceof(FirebaseDriver)
    chai.expect(driver.firebase).to.equal(firebase)
  })

  it('has methods for fetch, create, update and delete', () => { 
    let driver = new FirebaseDriver()
    chai.expect(driver.fetch).to.exist
    chai.expect(driver.create).to.exist
    chai.expect(driver.update).to.exist
    chai.expect(driver.delete).to.exist
  })
})