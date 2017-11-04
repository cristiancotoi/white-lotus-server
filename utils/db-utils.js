'use strict';

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

let mongoAddress = process.env.MONGO_ADDR || '127.0.0.1';

function connectToDb() {
    let dbName = 'whitelotus';
    let connectionString = mongoAddress + ':27017/' + dbName;
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

module.exports = connectToDb;