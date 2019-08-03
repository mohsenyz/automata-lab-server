var Datastore = require('nedb')
var express = require('express');
const server = express();
serialsDb = new Datastore({
    filename: 'serials.db',
    autoload: true,
    timestampData: true
});

server.get("/apps/:app/validate", function (req, res, next) {
    appName = req.params.app
    serial = req.query.serial
    findQuery = {app : appName, serial : serial, used : false}
    serialsDb.find(findQuery, function(err, docs) {
        if (docs.length == 0) {
            res.send("403");
        } else {
            res.send(200);
            serialsDb.update(findQuery, {used : true}, function(err, num) {});
        }
    })
});


server.get('/serials/new', function(req, res) {
    if (req.query.token == "ali123123*@") {
        appName = req.query.app
        serial = req.query.serial
        serialsDb.insert({
            app: appName,
            serial: serial,
            used : false
        }, function(err, docs) {
            res.send("You are fucking admin and serial saved");
        });
    } else {
        res.send("You are not fucking admin");
    }
});

server.listen(8898);