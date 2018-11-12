var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.parse('{"ID":"1","USERNAME":"mike","PASSWORD":"password","EMAIL":"mike@sce.com","PHONE":"1-800-111-2222","CREATE_TIME":null,"EXPIRE_TIME":null}'));
});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
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
});
var oracledb = require('oracledb');

// Get a non-pooled connection
oracledb.getConnection(
    {
        user: "system",
        password: "admin",
        connectString: "localhost:1521/xe"
    },
    function (err, connection)
    {
        console.log("This is proof.");
        if (err)
        {
            console.error(err.message);
            return;
        }
        connection.execute("select * from crew t", [], function (err, result)
        {
            if (err)
            {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.metaData);
            console.log(JSON.stringify(result.rows.map((v)=>
            {
                return result.metaData.reduce((p, key, i)=>
                {
                    p[key.name] = v[i];
                    return p;
                }, {})
            })));
            doRelease(connection);
        });
    });

// Note: connections should always be released when not needed
function doRelease(connection)
{
    console.log("This is $$$ proof.");
    connection.close(console.info);
    console.log("This is *** proof.");
}

module.exports = app;
