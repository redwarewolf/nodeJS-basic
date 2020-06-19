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
                expect(res.status).toBe(400);
                expect(res.body.message).toBe('The email provided is already in use');
                expect(res.body.internal_code).toBe('invalid_params');
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
              expect(res.status).toBe(400);
              expect(res.body.internal_code).toBe('invalid_params');
              done();
            });
        });
      });
    });
  });

  describe('/GET users', () => {
    describe('when using no query params', () => {
      it('should list all users', done => {
        factory.createMany('User', 5).then(() => {
          request
            .get('/api/v1/users')
            .set({
              Accept: 'application/json'
            })
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.body.count).toBe(5);
              done();
            });
        });
      });
    });

    describe('when using sending query params', () => {
      it('should list filtered users', done => {
        factory.createMany('User', 5).then(() => {
          factory.createMany('User', 2, { type: 'admin' }).then(() => {
            request
              .get('/api/v1/users')
              .query({ type: 'admin' })
              .set({
                Accept: 'application/json'
              })
              .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.count).toBe(2);
                done();
              });
          });
        });
      });
    });
  });
});
