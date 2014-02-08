var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/embraase', function(err, db) {
  'use strict';

  // Cluster module takes advantage of multi-processor machines.
  var cluster = require('cluster');

  if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i++) {
      cluster.fork();
    }

    cluster.on('exit', function (worker) {
      cluster.fork();
    });

  } else {

    var express = require('express'),
        app = express(),
        routes = require('./routes/routes.js'),
        cons = require('consolidate'),
        port = 80;

    app.configure('development', function(){
      app.engine('html', cons.swig);
      app.set('view engine', 'html');
      app.set('views', __dirname + '/views');
      app.use(express.bodyParser());
      app.use(express.cookieParser('1Zx1kpjä@vß'));
      app.use(express.session({secret: '1Zx1kpjä@vß'}));
      app.use(app.router);
      app.use(express.static(__dirname + '/public', { maxAge: 86400000 }));
    });

    routes(app, db);

    app.listen(port, function (){
      console.log('\nServer running on port:' + port);
    })

  }
});
