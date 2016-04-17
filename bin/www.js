/**
 * .
 */

var app = require('../app');
var port = process.env.OPENSHIFT_NODEJS_PORT || '8000';
var ip_addr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('port', port);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on ' + ip_addr + ':' + server.address().port);
});
