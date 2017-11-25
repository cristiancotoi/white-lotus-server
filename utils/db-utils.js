'use strict';

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
let dbName = 'whitelotus';

function connectToDbOld() {
    let connectionString = mongoURL + ':27017/' + dbName;
    // MONGODB_URL should also include trailing '/'

    // Ignoring because this is only present in production. Testing is irrelevant.
    /* istanbul ignore next */
    if (process.env.MONGODB_URL) {
        connectionString = process.env.MONGODB_URL + dbName;
    }

    /* istanbul ignore next */
    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString =
            process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    if (!mongoose.connection.readyState) {
        mongoose.connect(connectionString, {
                db: {nativeParser: true}
            }
        );
    }
}

function connectToDb() {
    let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
        mongoURLLabel = "";

    let connectionString = mongoURL + ':27017/' + dbName;

    if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
        console.info('Running in production.');
        var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
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
            // Provide UI label that excludes user id and pw
            mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
            mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        }

        connectionString = "";
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