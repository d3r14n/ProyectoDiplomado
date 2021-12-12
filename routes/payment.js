var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment.controller');
var middleware = require('../middleware');


router.use(middleware);

router
    .get('/payment/promos', paymentController.getPromos);
    /*.get('/payment/promos', function(req, res) {
        res.json(paymentController.getPromos);
    });*/

module.exports = router;
