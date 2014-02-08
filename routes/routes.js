(function () {

  var user = require('./lib/User.js');
  var http = require('http');

  module.exports = function(app, db) {
    'use strict';
    var u = new user(db);

    app.get('/', function(req, res) {
      res.render('index.html', {resMsg: ''}, function(err, html){
        if(!err){
           res.send(html);
        } else {
           res.send(404);
        }
      });
    });

    app.get('/login', function(req, res) {
      res.render('login.html', {resMsg: 'Account Login'}, function(err, html){
        if(!err){
           res.send(html);
        } else {
           res.send(500);
        }
      });
    });

    app.get('/css/:cssFile', function(req, res){
      res.sendfile('./public/css/'+ req.params.cssFile, function(err){
        if(err){
          res.send(404);
        }
      });
    });

    app.get('/js/:jsFile', function(req, res){
      res.sendfile('./public/js/' + req.params.jsFile, function(err){
        if(err){
          res.send(404);
        }
      });
    });

    app.get('/images/:imageFile', function(req, res){
      res.sendfile('./public/images/' + req.params.imageFile, function(err){
        if(err){
          res.send(404);
        }
      });
    });

    app.post('/user/signup', function(req, res) {
      var b = req.body;

      u.saveSignup(b, function(err, resMsg) {
        if (!err) {
          res.render('index.html', {resMsg: resMsg}, function(err, html) {
            if(!err){
               res.send(html);
            } else {
               res.send(500);
            }
          });
        } else {
          res.render('index.html', {resMsg: err}, function(err, html) {
            if(!err){
               res.send(html);
            } else {
               res.send(500);
            }
          });
        }
      });
    });

    app.post('/user/login', function(req, res) {
      var b = req.body;

      u.loginUser(b, function(err, result) {
        if(result){
          req.session.loggedIn = 1;
          req.session.firstname = result.f;
          res.redirect('/user/home');
        } else {
          res.render('login.html', {resMsg: err}, function(err, html) {
            if(!err){
               res.send(html);
            } else {
               res.send(500);
            }
          });
        }
      });
    });

    app.get('/user/home', function(req, res) {
      if(req.session.loggedIn === 1){

        var options = {
          host : 'api.ipinfodb.com',
          path : '/v3/ip-city/?key=144a7c54cbb4aff26a4fef1efd5739eff16' +
              'c00f9d967a431dd717666108660ea&ip=' + req.ip + '&format=json',
          port : 80,
          method : 'GET'
        }

        var request = http.request(options, function(response){
          var body = '';
          response.on('data', function(data) {
            body += data;
          });
          response.on('end', function() {
            var fullInfo = JSON.parse(body);
            fullInfo.firstname = req.session.firstname;
            res.render('home.html', fullInfo, function(err, html) {
              if(!err){
                 res.send(html);
              } else {
                 res.send(500);
              }
            });

          });
        });
        request.on('error', function(e) {
          console.log('Problem with request: ' + e.message);
        });
        request.end();
      } else {
        res.render('login.html', {resMsg: 'Please login.'},
                                                      function(err, html) {
          if(!err){
             res.send(html);
          } else {
             res.send(500);
          }
        });
      }
    });

    app.get('/user/logout', function(req, res) {
      req.session.destroy();
      res.render('login.html', {loginMsg: 'Please re-login.'},
                                                        function(err, html){
        if(!err){
           res.send(html);
        } else {
           res.send(500);
        }
      });
    });

    app.get('*', function(req, res){
      res.send(404);
    });

  }
})();
