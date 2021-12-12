const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const Promise = require('bluebird');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('Operations', async () => {
    let req, res, next, agent;

    it('Create shipment', (done) => {
        chai.request(server)
        .get('/shipment/create')
        .then(res =>{
            console.log("LOG: " + JSON.stringify(res.body))
            expect(res.body).to.be.have.keys(['address', 'costumer', 'price']);
            done();
        }).catch(done);
    });

    it('Get code 201 from address', (done) => {
        chai.request(server)
        .get('/shipment/address')
        .then(res =>{
            res.status.should.eql(201);
            done();
        }).catch(done);
    });
});
