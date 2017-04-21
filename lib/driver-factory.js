// import FirebaseDriver from './drivers/firebase-driver'
// import ApiDriver from './drivers/api-driver'
// import AlgoliaDriver from './drivers/algolia-driver'

// class BlueprintDriverFactory {
//   /**
//    * Construct the driver factory.
//    * @param  {Firebase} options.firebase  An instance of the firebase service
//    * @param  {ApiService} options.api  An instance of the API service
//    * @param  {Algolia} options.algolia  An instance of the Algolia service
//    * @return {BlueprintDriverFactory}
//    */
//   constructor ({ firebase = null, api = null, algolia = null }) {
//     this.firebase = firebase
//     this.api = api
//     this.algolia = algolia
//   }

//   /**
//    * Create a driver type by loading a blueprint.
//    * @param  {string} type  The type of driver to create.
//    * @param  {Blueprint} blueprint  The blueprint to load.
//    * @return {FirebaseDriver|LaravelDriver|AlgoliaDriver}  The loaded driver.
//    * @throws {BlueprintDriverFactoryError} If the driver type is unsupported.
//    */
//   load (type, blueprint) {
//     switch (type) {
//       case 'firebase':
//         if (this.firebase === null) {
//           throw new BlueprintDriverFactoryError(`You are attempting to load an unsupported driver type: ${type}`)
//         }
//         return new FirebaseDriver(this.firebase, blueprint)
//       case 'api':
//         if (this.api === null) {
//           throw new BlueprintDriverFactoryError(`You are attempting to load an unsupported driver type: ${type}`)
//         }
//         return new LaravelDriver(this.api, blueprint)
//       case 'algolia':
//         if (this.algolia === null) {
//           throw new BlueprintDriverFactoryError(`You are attempting to load an unsupported driver type: ${type}`)
//         }
//         return new AlgoliaDriver(this.api, blueprint)
//       default:
//         throw new BlueprintDriverFactoryError(`You are attempting to load an unsupported driver type: ${type}`)
//     }
    
//   }
// }

// /**
//  * An exception for setting an invalid driver.
//  */
// export class BlueprintDriverFactoryError extends Error {
//   /**
//    * Construct the error
//    * @param  {string} message  The error message.
//    * @return {BlueprintDriverFactoryError}  The Error.
//    */
//   constructor(message) {
//     super(message)
//     this.name = 'BlueprintDriverFactoryError'
//   }
// }
