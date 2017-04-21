# Lantern Blueprint

> A package for managing your data through models, with several drivers supported out of the box.

This package is part of Lantern. Take the application for a spin: [vue-lantern](https://lantern-1dd90.firebaseapp.com)

## Examples
Define your data model such as the driver, location of data on your backend service, events, etc. and let Lantern connect your model with the rest of your application.

``` javascript
export default {
  name: 'example',
  driver: 'firebase',
  events: {...},
  module: {...},
  transformRequest () {...},
  transformResponse () {...}
}
```

``` javascript
model('example').create({ name: 'test', message: 'Hello world!'})
model('example').driver('algolia').all()
model('user').fetch(1).then(user => {
	user.messages.create({ text: 'This message is saved to the user.'})
})
model('user').create({ name: 'John Smith' }).then(user => {
	model('group').create({ name: 'San Diego Devs' }).then(group => {
		user.link(group) // user is now part of group, and group lists the user
	})
})
```

