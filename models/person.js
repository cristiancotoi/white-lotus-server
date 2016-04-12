/**
 * .
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var personSchema=new Schema({
    title:String,
    releaseYear:'String',
    director:'String',
    genre:'String'
});

module.exports=mongoose.model('Person',personSchema);