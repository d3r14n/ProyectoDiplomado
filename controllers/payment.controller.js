const path = require('path');
const PAYMENT_FILE_PATH = path.resolve('./payment-generated.txt');
const faker = require('faker');
const fs = require('fs');
const LINE_ENDING = require('os').EOL;

module.exports = {
    create: function (req, res) {
        const fd = fs.openSync(PAYMENT_FILE_PATH, 'a');
        fs.appendFileSync(fd, faker.commerce.price() + LINE_ENDING, {encoding: 'utf8'});
        res.status(201).send();
    },

    applyDiscount: function (req, res) {
        //debera de restar una cantidad a cada precio en payment-generated.txt
        var cantidadARestar = Math.floor(Math.random() * (500))
        var precioTotal = faker.commerce.price();
        const fd = fs.openSync(PAYMENT_FILE_PATH, 'a');
        fs.appendFileSync(fd, (precioTotal - cantidadARestar) + LINE_ENDING,
        {encoding: 'utf-8'});
        res.json({
            precio: precioTotal,
            descuento: cantidadARestar,
            total: (precioTotal - cantidadARestar),
        });
    },

    getPromos: function (req, res) {
        res.json([
            {name: "BUENFIN"},
            {name: "HOTSALE"},
            {name: "CYBERMONDAY"},
            {name: "BLACKFRIDAY"},
            {name: "PRIMEDAY"},
        ]);
    }
};
