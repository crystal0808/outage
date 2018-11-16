var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var fs = require("fs");
var util = require('util');
const http = require('http');
const hostname = '192.168.43.110';
//const hostname = '172.20.10.6';
const port = 3000;
const user = "system";
const password = "admin";
const connectString = "localhost:1521/xe";

var server = app.listen(port, hostname, function () {
    let host1 = server.address().address
    let port1 = server.address().port
    console.log("application started，address is http://%s:%s", host1, port1)
})

var oracledb = require('oracledb');

// Get a non-pooled connection
function getOutageList(res) {
    var connection = oracledb.getConnection(
        {
            user: user,
            password: password,
            connectString: connectString
        }, function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute("select * from outage t", [], function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                let dbresult = JSON.stringify(result.rows.map((v) => {
                    return result.metaData.reduce((p, key, i) => {
                        p[key.name] = v[i];
                        return p;
                    }, {})
                }));
                doRelease(connection);
                res.end(dbresult);
            });

        }
    );
}


function updateOutage(reqBody, res) {
    console.log(reqBody)
    var connection = oracledb.getConnection(
        {
            user: user,
            password: password,
            connectString: connectString
        }, function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var values = [];
            values.push(reqBody.TYPE, reqBody.CITY, reqBody.ZIPCODE, reqBody.ADDRESS,
                reqBody.IMPACTED, reqBody.START_TIME, reqBody.ESTIMATED_RES_TIME, reqBody.REASON, reqBody.CREW_STATUS, reqBody.ID)
            console.log(values)
            connection.execute("UPDATE outage set TYPE=:type, CITY=:city, ZIPCODE=:zipcode, ADDRESS=:address," +
                "IMPACTED=:impacted, START_TIME=:start_time, ESTIMATED_RES_TIME=:estimated_res_time, REASON=:reason, CREW_STATUS=:crew_status where ID=:id",
                values, {autoCommit: true}, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    if (result.rowsAffected === 1) {
                        doRelease(connection);
                        console.log("ss")
                        res.send({code:0, msg: "success"})
                        return;
                    }
                    doRelease(connection);
                }
            )
        }
    );
}

function queryOutage(outageId, res) {
    var connection = oracledb.getConnection(
        {
            user: user,
            password: password,
            connectString: connectString
        }, function (err, connection) {
            if (err) {
                console.error("err: " + err.message);
                return;
            }
            connection.execute("select * from outage where ID=:id", {id: outageId}, {autoCommit: true}, function (err, result) {
                    if (err) {
                        console.error("err: " + err.message);
                        doRelease(connection);
                        return;
                    }
                    let queryResult = JSON.stringify(result.rows.map((v) => {
                        return result.metaData.reduce((p, key, i) => {
                            p[key.name] = v[i];
                            return p;
                        }, {})
                    }));
                    res.end(queryResult);
                    doRelease(connection);
                }
            )
        }
    );
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.post('/outage/:id', function (req, res) {
    updateOutage(req.body.outage, res);
});
app.get('/outageList', function (req, res) {
    getOutageList(res);
});
app.get('/outage/:id', function (req, res) {
    queryOutage(req.params.id, res)
});

// Note: connections should always be released when not needed
function doRelease(connection) {
    connection.close(console.info);
}

module.exports = app;
