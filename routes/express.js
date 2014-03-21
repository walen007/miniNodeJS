module.exports = function(db) {
  'use strict';

  var express = require('express'),
      app = express(),
      cons = require('consolidate'),
      routes = require('./routes.js');

  app.configure('development', function(){
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/../views');
    app.use(express.compress());
    app.use(express.static(__dirname + '/../public'));
    app.use(express.bodyParser());
    app.use(express.cookieParser('1Zx1kpjä@vß'));
    app.use(express.session({secret: '1Zx1kpjä@vß'}));
  });

  routes(app, db);

  return app;

}
