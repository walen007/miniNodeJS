// Tests public facing HTTP end points.
var dbConn = 'mongodb://localhost:27017/miniNodeJS',
    should = require('should'),
    supertest = require('supertest'),
    MongoClient = require('mongodb').MongoClient,
    express = require('../routes/express.js'),
    dBase, xApp;

describe('miniNodeJS App', function(){

  it('should return home page and "200" status code', function(done){
    MongoClient.connect(dbConn, function(err, database) {
      dBase = database;
      xApp = express(database);
      supertest(xApp)
      .get('/')
      .expect(200)
      .end(function(err, res){
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

  it('should serve the login page and "200" status code', function(done) {
    supertest(xApp)
    .get('/login')
    .expect(200)
    .end(function(err, res){
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('should serve a static file and "200" status code', function(done) {
    supertest(xApp)
    .get('/css/bootstrap.css')
    .expect(200)
    .end(function(err, res){
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('should return error 404 "Page Not Found"', function(done) {
    supertest(xApp)
    .get('/bad_URL')
    .expect(404)
    .end(function(err, res){
      res.statusCode.should.equal(404);
      dBase.close();
      done();
    });
  });

});
