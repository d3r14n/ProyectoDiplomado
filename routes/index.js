var express = require('express');
var router = express.Router();
var Sentry = require('@sentry/node');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Proyecto para el diplomado</h1><h2>Arquitectura y Desarrollo de Software con Tecnologías Ágiles</h2><p>por Derian Jair Hernández Lira</p>');
});

router.get("/debug-sentry", function mainHandler(req, res){
  throw new Error("I AM ERROR.");
});

module.exports = router;
