var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment.controller');

router.get("/", function(req, res){
    res.send("Welcome to Payment");
});

router.get('/promos', paymentController.getPromos);

router.get('/discount', paymentController.applyDiscount);

module.exports = router;
