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

app.get('/', function (req, res) {
    res.send('Hello World');
})
var server = app.listen(port, hostname, function () {
    console.log("sss")
    let host1 = server.address().address
    let port1 = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host1, port1)
})
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.post('/', function (req, res) {
    console.log("receive post");
    console.log(req.body);
    //  console.log(req.body.name);
    //   console.log(req.body.tel);\
    var data = JSON.stringify({
        "user1": {
            "name": "mahesh",
            "password": "password1",
            "profession": "teacher",
            "id": 1
        },
        "user2": {
            "name": "suresh",
            "password": "password2",
            "profession": "librarian",
            "id": 2
        },
        "user3": {
            "name": "ramesh",
            "password": "password3",
            "profession": "clerk",
            "id": 3
        }
    });
    res.send(data);
});
/*app.get('/listUsers', function (req, res) {
    var data = JSON.stringify({
        "user1": {
            "name": "mahesh",
            "password": "password1",
            "profession": "teacher",
            "id": 1
        },
        "user2": {
            "name": "suresh",
            "password": "password2",
            "profession": "librarian",
            "id": 2
        },
        "user3": {
            "name": "ramesh",
            "password": "password3",
            "profession": "clerk",
            "id": 3
        }
    });
    console.log(data);
    res.end(data);
})*/
// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/
var oracledb = require('oracledb');

// Get a non-pooled connection
var dbresult = '';
var queryResult = '';
//添加的新用户数据
var user = {
    "id": "6",
    "username": "stan",
    "password": "password4",
    "email": "stan@lee.com",
    "phone": "1-800-111-8888",
    "CREATE_TIME": null,
    "EXPIRE_TIME": null
}

/* {
     "username": "coco",
     "password": "password4",
     "email": "coco@lee.com",
     "id": 7,
     "phone": "1-800-111-8888",
     "CREATE_TIME": null,
     "EXPIRE_TIME": null
 }*/


function getOutageList() {
    console.log("get inszide")
    var connection = oracledb.getConnection(
        {
            user: "system",
            password: "admin",
            connectString: "localhost:1521/xe"
        }, function (err, connection) {
        //    console.log("This is proof.");
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
                    //    console.log("aaaddddjjj")
                   //     console.log(result);
                        dbresult = JSON.stringify(result.rows.map((v) => {
                            return result.metaData.reduce((p, key, i) => {
                                p[key.name] = v[i];
                                return p;
                            }, {})
                        }));
                  //      console.log(dbresult)
                        doRelease(connection);
                    });

        }
    );
}


function updateOutage(outageId) {
    var connection = oracledb.getConnection(
        {
            user: "system",
            password: "admin",
            connectString: "localhost:1521/xe"
        }, function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            //   let json = JSON.stringify(user);
            //  var values = [];
            //   values.push(user.id, user.username, user.password, user.email, user.phone, user.CREATE_TIME, user.EXPIRE_TIME)
            //console.log(values)
            //   connection.execute("select * from outage where ID=:id", { id:"987123"},{autoCommit: true}, function (err, result) {
            connection.execute("UPDATE outage set CITY=:city where ID=:id", {
                    city: "bewooo",
                    id: "987123"
                }, {autoCommit: true}, function (err, result) {

                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    if (result.rowsAffected === 1) {
                        console.log("Update success")
                        doRelease(connection);
                        return;
                    }
                    doRelease(connection);
                }
            )
        }
    );
}
function queryOutage(outageId) {
    var connection = oracledb.getConnection(
        {
            user: "system",
            password: "admin",
            connectString: "localhost:1521/xe"
        }, function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
               connection.execute("select * from outage where ID=:id", { id:outageId},{autoCommit: true}, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    queryResult = JSON.stringify(result.rows.map((v) => {
                       return result.metaData.reduce((p, key, i) => {
                           p[key.name] = v[i];
                           return p;
                       }, {})
                   }));
                    console.log(queryResult)
                   res.end(queryResult);
                    doRelease(connection);
                //   console.log(queryResult)
                   // return queryResult;
                }
            )
        }
    );
}
app.post('/outage/:id', function (req, res) {
    console.log("receive post");
    console.log(req.params.id);
    //  console.log(req.body.name);
    //   console.log(req.body.tel);\
    var data = JSON.stringify({
        "user1": {
            "name": "mahesh",
            "password": "password1",
            "profession": "teacher",
            "id": 1
        },
        "user2": {
            "name": "suresh",
            "password": "password2",
            "profession": "librarian",
            "id": 2
        },
        "user3": {
            "name": "ramesh",
            "password": "password3",
            "profession": "clerk",
            "id": 3
        }
    });
    res.send(data);
});
app.get('/outageList', function (req, res) {
    getOutageList();
    console.log("outage")
    console.log(dbresult);
    res.end(dbresult);
});
app.get('/outage/:id', function (req, res) {
    //updateOutage();
    console.log(queryResult)
    console.log(req.params.id)
    queryOutage(req.params.id)

    console.log(queryResult)

});

// Note: connections should always be released when not needed
function doRelease(connection) {
    connection.close(console.info);
}

module.exports = app;
