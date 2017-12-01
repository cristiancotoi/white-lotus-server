'use strict';

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    contentTypes = require('./utils/content-types'),
    sysInfo = require('./utils/sys-info'),
    express = require('express'),
    bodyParser = require('body-parser'),
    connectToDb = require('./utils/db-utils'),
    cors = require('cors');

let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

let persons = require('./routes/persons');
let pSquare = require('./routes/psquare');
let bazi = require('./routes/bazi');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', persons);
app.use('/api', pSquare);
app.use('/api', bazi);
app.use(express.static('static'));
app.get('/health', function(req, res) {
    res.writeHead(200);
    res.end();
});

// Health check for OpenShift
app.get('/pagecount', function(req, res) {
    res.writeHead(200);
    res.end();
});
app.get('/routes', function(req, res) {
    let router = express.Router();
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

app.listen(port, ip, function () {
    console.log(`Application worker ${process.pid} started...`);
    console.log('Express server listening on ' + ip + ':' + port);
});

module.exports = app;
