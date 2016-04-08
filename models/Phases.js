/**
 * Created by Cristian on 04/04/2016.
 */

var mongoose = require('mongoose');

var PhaseSchema = new mongoose.Schema({
    name: String,
    shortName: String
    //post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

mongoose.model('Phase', PhaseSchema);