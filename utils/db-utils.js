'use strict';

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');


function connectToDb() {
    let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
        mongoURLLabel = "";
    let dbName = 'whitelotus';

    let connectionString = mongoURL + ':27017/' + dbName;

    if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
        console.info('Running in production.');
        let mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
            mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
            mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
            mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
            mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
            mongoUser = process.env[mongoServiceName + '_USER'];

        if (mongoHost && mongoPort && mongoDatabase) {
            mongoURLLabel = mongoURL = 'mongodb://';
            if (mongoUser && mongoPassword) {
                mongoURL += mongoUser + ':' + mongoPassword + '@';
            }
        }

        connectionString = "mongodb://";
        if (mongoUser && mongoPassword) {
            connectionString += mongoUser + ":" + mongoPassword + '@';
        }
        connectionString += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    }

    let options = {
        useMongoClient: true,
        reconnectTries: 500,
        reconnectInterval: 500
    };
    connectWithRetry(connectionString, options)
}

let connectWithRetry = function (mongoUrl, options) {
    if (!mongoose.connection.readyState) {
        mongoose.connect(mongoUrl, options)
            .then(
                () => {
                    console.info('MongoDB connection successful.')
                },
                err => {
                    let secondsDelay = 5;
                    console.error('Failed to connect to mongo on startup - retrying in ' + secondsDelay + ' sec');
                    setTimeout(function () {
                        connectWithRetry(mongoUrl, options)
                    }, secondsDelay * 1000);
                }
            );
    }
};


module.exports = connectToDb;