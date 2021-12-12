var express = require('express');
var router = express.Router();
var operationsController = require('../controllers/operations.controller');

router.get('/', function(req, res){
    res.send("Welcome to Operations");
});
router.get('/sum/:num1/:num2', operationsController.sum);
router.get('/substract/:num1/:num2', operationsController.substract);
router.get('/multiply/:num1/:num2', operationsController.multiply);
router.get('/divide/:num1/:num2', operationsController.divide);

module.exports = router;
