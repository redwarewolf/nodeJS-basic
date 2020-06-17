const { factory } = require('factory-girl');
const { User } = require('../../app/models');

factory.define('User', User, {
  name: factory.chance('first'),
  password: factory.chance('string', { length: 8, alpha: true }),
  email: factory.chance('email', { domain: 'wolox.com.ar' }),
  type: 'regular',
  country: factory.chance('country'),
  state: factory.chance('state'),
  birthDate: factory.chance('date'),
  city: factory.chance('city'),
  address: factory.chance('address'),
  emailSubscription: factory.chance('bool'),
  numberOfLanguages: factory.chance('integer', { min: 1, max: 10 })
});
