const supertest = require('supertest');
const app = require('../app');
const {expect} = require('chai');

describe('app-module', () => {
  describe('GET /frequency', () => {
    it('should run standard success', () => {
      return supertest(app)
        .get('/frequency')
        .query({s: 'banana'})
        .expect(200)
        .expect('Content-type', /json/)
    })

    it('should return 400 status if no string is provided', () => {
      return supertest(app)
        .get('/frequency')
        .expect(400, 'Invalid request')
    })

    it('should return object with keys of letters and their counts', () => {
      return supertest(app)
        .get('/frequency')
        .query({s: 'banana'})
        .then(res => {
          expect(res.body).to.deep.equal({b:1, a:3, n:2, average: 2, highest: 'a', unique:3})
        })
    })
  })
})