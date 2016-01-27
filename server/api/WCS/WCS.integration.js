'use strict';

var app = require('../..');
import request from 'supertest';

var newWCS;

describe('WCS API:', function() {

  describe('GET /api/WCS', function() {
    var WCSs;

    beforeEach(function(done) {
      request(app)
        .get('/api/WCS')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          WCSs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      WCSs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/WCS', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/WCS')
        .send({
          name: 'New WCS',
          info: 'This is the brand new WCS!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWCS = res.body;
          done();
        });
    });

    it('should respond with the newly created WCS', function() {
      newWCS.name.should.equal('New WCS');
      newWCS.info.should.equal('This is the brand new WCS!!!');
    });

  });

  describe('GET /api/WCS/:id', function() {
    var WCS;

    beforeEach(function(done) {
      request(app)
        .get('/api/WCS/' + newWCS._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          WCS = res.body;
          done();
        });
    });

    afterEach(function() {
      WCS = {};
    });

    it('should respond with the requested WCS', function() {
      WCS.name.should.equal('New WCS');
      WCS.info.should.equal('This is the brand new WCS!!!');
    });

  });

  describe('PUT /api/WCS/:id', function() {
    var updatedWCS;

    beforeEach(function(done) {
      request(app)
        .put('/api/WCS/' + newWCS._id)
        .send({
          name: 'Updated WCS',
          info: 'This is the updated WCS!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWCS = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWCS = {};
    });

    it('should respond with the updated WCS', function() {
      updatedWCS.name.should.equal('Updated WCS');
      updatedWCS.info.should.equal('This is the updated WCS!!!');
    });

  });

  describe('DELETE /api/WCS/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/WCS/' + newWCS._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when WCS does not exist', function(done) {
      request(app)
        .delete('/api/WCS/' + newWCS._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
