const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    contentTypes = require('./utils/content-types'),
    sysInfo = require('./utils/sys-info'),
    env = process.env,
    express = require('express'),
    bodyParser = require('body-parser'),
    connectToDb = require('./utils/db-utils'),
    cors = require('cors');

let port = process.env.OPENSHIFT_NODEJS_PORT || '8080';
let ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var persons = require('./routes/persons');
var pSquare = require('./routes/psquare');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', persons);
app.use('/api', pSquare);
app.use(express.static('static'));
app.get('/health', function(req, res) {
    res.writeHead(200);
    res.end();
});
app.get('/routes', function(req, res) {
    var router = express.Router();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(router.stack));
});

function getSysInfo(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[req.originalUrl.slice(6)]()));
}
app.get('/info/poll', getSysInfo);
app.get('/info/gen', getSysInfo);

connectToDb();

app.listen(port, ipAddress, function () {
    console.log(`Application worker ${process.pid} started...`);
    console.log('Express server listening on ' + ipAddress + ':' + port);
});

module.exports = app;
