/**
 * 
 */
export default class FirebaseDriver {

  /**
   * Construct the driver with an instance of firebase and a blueprint.
   * @param  {Firebase} firebase  An initialized instance of firebase.
   * @param  {Blueprint} blueprint  A blueprint.
   * @return {FirebaseDriver}  A firebase driver.
   */
  constructor(firebase, blueprint) {
    this.firebase = firebase
    this.blueprint = blueprint
  }
}
