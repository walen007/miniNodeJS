var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/miniNodeJS', function(err, db){
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
    var app = require('./routes/express.js')(db),
        port = 80; // Port 80 may not work without "sudo".

    app.listen(port, function () {
      console.log('\nwww running on http://localhost:' + port);
    });
  }
});
