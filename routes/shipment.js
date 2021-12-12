var express = require('express');
var router = express.Router();
var shipmentController = require('../controllers/shipment.controller');

router.get('/', function(req, res){
    res.send("Welcome to Shipment");
});
router.get('/create', shipmentController.createShipment);
router.get('/address', shipmentController.changeStatus);

module.exports = router;
