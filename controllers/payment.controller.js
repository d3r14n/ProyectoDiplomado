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
        const fd = fs.readFile(PAYMENT_FILE_PATH, {encoding: 'utf-8'}, (err, data) => {
            if (err) reject(err);
            else res.json({ message: data * 0.8 });
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
