import Blueprint from '../lib/blueprint'
import FirebaseDriver from '../lib/drivers/firebase'
// import { } from '../lib/symbols'
import assert from 'assert'
import sinon from 'sinon'

describe('FirebaseDriver', () => {
  it('can be constructed with an instance of firebase and a blueprint', () => {
    let firebase = sinon.spy()
    let blueprint = new Blueprint({ name: 'name', driver: 'firebase'})
    let driverInstance = new FirebaseDriver(firebase)
    let driver = driverInstance.load(blueprint)
    assert(driver.firebase === firebase)
    assert(driver.blueprint === blueprint)
  })
})