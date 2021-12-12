var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');
var authRouter = require('./routes/auth');
var paymentRouter = require('./routes/payment');

var app = express();

var dd_options = {
    'response_code':true,
    'tags' : ['app:diploproyect']
}
var connect_datadog = require('connect-datadog')(dd_options);

Sentry.init({
    dsn: "https://ea7f93daef9c41d2bf2797106a43dc3b@o1059722.ingest.sentry.io/6103729",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
      ],
    tracesSampleRate: 1.0,
});

// view engine setup
app.set('view engine', 'jade');

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next){
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/payment', paymentRouter);

app.use(connect_datadog);

module.exports = app;

app.listen(3000, () => {
    console.log("SERVER on PORT 3000")
})
