var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var routes = require('./routes/index');
//var users = require('./routes/users');
var Product = require('./bear.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

//mongoose.connect('mongodb://url:port/db');
mongoose.connect('mongodb://devuser01:devuser01@ds139937.mlab.com:39937/devdb');

var router = express.Router();              // get an instance of the express Router

router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
router.get('/products', function (req, res) {
    Product.find(function (err, products){

        if (err) {
            res(err);
        } else {
            res.json(products);
        }        

    })
    
});

// more routes for our API will happen here

router.route('/products')    
    .post(function (req, res) {
    
    var product = new Product();      // create a new instance
    product.name = req.body.name;  
    product.category = req.body.category;  
    product.price = req.body.price;  
    
    product.save(function (err) {
        if (err) {
            res.send(err);
        } else {            
            res.json(product);
        }
    });

});


router.route('/products/:product_id')    
    .get(function (req, res) {
    Product.findById(req.params.product_id, function (err, bear) {
        if (err) {
            res.send(err);
        } else {
            res.json(bear);
        }
    })
})

 .put(function (req, res) {
         
    Product.findById(req.params.product_id, function (err, product) {
        
        if (err) {
            res.send(err);
        } else {            
            product.name = req.body.name;  
            product.category = req.body.category;  
            product.price = req.body.price;  
                        
            product.save(function (err) {
                if (err) {
                    res.send(err);
                } else {                    
                    res.json({ message: 'Product updated!' });
                }
            });
        }
    });

})

 .delete(function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err) {
            res.send(err);
        } else {            
            res.json({ message: 'Successfully deleted' });
        }
    });
});



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
