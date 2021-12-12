//deberas de utilizar faker para generar los datos
const { fake } = require('faker');
const faker = require('faker');

module.exports = {
    createShipment: function (req, res) {
        //debera de simular un envio con dirección un precio y una persona con sus datos
        var shipment = {
            address: {
                country: faker.address.country(),
                city: faker.address.city(),
                streetname: faker.address.streetName(),
                zipCode: faker.address.zipCode(),
                state: faker.address.state(),
            },
            price: faker.commerce.price(),
            costumer: faker.name.findName(),
        }
        res.json(shipment);
    },
    changeStatus: function (req, res) {
        //Debera de retornar una dirección random
        // codigo de respuesta 201
        // data la direcciòn random
        res.status(201).json({address: {
            country: faker.address.country(),
            city: faker.address.city(),
            streetname: faker.address.streetName(),
            state: faker.address.state()
        }});
    },
};
