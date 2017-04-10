import FirebaseDriver from './firebase-driver'

/**
 * 
 */
class FirebaseDriverFactory {
  /**
   * Construct the driver factory with an initialized instance of firebase.
   * @param  {Firebase} firebase  An initialized instance of firebase.
   * @return {FirebaseDriverFactory}  A firebase driver factory.
   */
  constructor (firebase) {
    this.firebase = firebase
  }

  /**
   * Returns a new firebase driver with a loaded blueprint.
   * @param  {Blueprint} blueprint  The blueprint for the driver.
   * @return {FirebaseDriver}  A blueprint firebase driver.
   */
  load (blueprint) {
    return new FirebaseDriver(this.firebase, blueprint)
  }
}