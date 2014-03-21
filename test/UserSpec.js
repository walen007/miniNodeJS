// Tests User Module.
var should = require('should'),
    supertest = require('supertest'),
    MongoClient = require('mongodb').MongoClient,
    User = require('../routes/lib/User.js'),
    usr,
    dBase;

var signupInfo = {
	'firstname' : 'TestFirstname',
	'lastname' : 'TestLastname',
	'email' : 'testemail@example.com',
	'password' : 'password'
};

var invalidInfo = {
	'firstname' : 'TestFirstname',
	'lastname' : '',
	'email' : 'testemail@example.com',
	'password' : 'password'
};

describe('User Object', function() {

  it('should connect to db', function(done){
    MongoClient.connect('mongodb://localhost:27017/miniNodeJS',
      function(err, db) {
      'use strict';
      db.serverConfig.connected.should.equal(true);
      db.databaseName.should.equal('miniNodeJS');
      usr = new User(db);
      dBase = db;
      done();
    });
  });

  it('should reject an invalid singup info', function(done) {
    usr.saveSignup(invalidInfo, function(err, res) {
      should.not.exist(res);
      should.exist(err);
      done();
    });
  });

  it('should pass valid signup', function(done) {
    usr.saveSignup(signupInfo, function(err, res) {
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

  it('should reject an invalid login info', function(done){
    var loginInfo = {
        email: signupInfo.e,
        password: ''
    };
    usr.loginUser(loginInfo, function(err, res) {
      should.not.exist(res);
      should.exist(err);
      done();
    });
  });

  it('should pass valid login', function(done){
    var loginInfo = {
        email: signupInfo.email,
        password: signupInfo.password
    };
    usr.loginUser(loginInfo, function(err, res) {
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

  it('should delete test account.', function(done) {
    var em = signupInfo.email;
    dBase.collection('users').remove({e: em}, function(err, res) {
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

});
