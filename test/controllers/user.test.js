const supertest = require('supertest');
const { factory } = require('factory-girl');
const lodash = require('lodash');
const converter = require('../helpers/converter');
const app = require('../../app');

const request = supertest(app);

require('../factory/user');

describe('Users Controller', () => {
  describe('/POST users', () => {
    describe('when using valid parameters', () => {
      it('should create a new user', done => {
        factory.attrs('User').then(body => {
          request
            .post('/api/v1/users')
            .send(converter.objectToSnakeCase(body))
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(201);
              expect(
                lodash.omit(res.body, ['id', 'birthDate', 'password', 'createdAt', 'updatedAt'])
              ).toEqual(lodash.omit(body, ['password', 'birthDate']));
              done();
            });
        });
      });
    });

    describe('should not create a new user', () => {
      it('when using a repeated mail', done => {
        factory.create('User').then(user => {
          factory.attrs('User', { email: `${user.email}` }).then(body => {
            request
              .post('/api/v1/users')
              .send(converter.objectToSnakeCase(body))
              .set('Accept', 'application/json')
              .then(res => {
                expect(res.status).toBe(500);
                done();
              });
          });
        });
      });

      it('when using a invalid password', done => {
        factory.attrs('User', { password: 'foo' }).then(body => {
          request
            .post('/api/v1/users')
            .send(converter.objectToSnakeCase(body))
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(422);
              expect(res.body.internal_code).toBe('invalid_params');
              done();
            });
        });
      });
    });
  });
});
