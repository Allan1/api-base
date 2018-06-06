module.exports = function(Model, options) {
  'use strict';
  var app = require('../../server/server');
  var loopback = require('loopback');
  var kue = require('kue');
  var moment = require('moment');
  require('dotenv').config();
  
  var queue = kue.createQueue({
	  // prefix: 'q',
	  redis: {
	    port: process.env.REDIS_PORT,
	    host: process.env.REDIS_DOMAIN,
	    auth: process.env.REDIS_PASSWORD,
	    options: {
	      // see https://github.com/mranney/node_redis#rediscreateclient
	    }
	  }
	});

	Model.clearJobs = function () {
		
	};

	Model.queueEmail = function (data) {
		var job = queue.create('email',data).save();
	}

	Model.sendEmail = function (data,cb) {
	  app.models.Email.send({
	    to: data.to,
	    from: data.from,
	    subject: data.subject,
	    html: data.html
	  },cb);
	};

	queue.process('email', function(job, done){
	  Model.sendEmail(job.data, done);
	});

}