let mongoose = require('mongoose');

/**
 * Verify if a collection exists
 * so we don't cause an exception trying to overwrite it
 * @param collName collection name
 * @returns {boolean} true if collection exists
 */
function collectionExists(collName) {
    let result = false;
    // Doesn't seem to work
    // db is always undefined...
    // without this mocha can't use --watch
    let db = mongoose.connection.db;
    if (!db) return false;
    db
        .listCollections({name: collName})
        .next(function (err, collinfo) {
            if (collinfo) {
                result = true;
            }
        });
    return result;
}

module.exports = collectionExists;