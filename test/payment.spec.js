const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const payment = require('../controllers/payment.controller');
const PAYMENT_FILE_PATH = path.resolve('./payment-generated.txt');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const Promise = require('bluebird');
const { expect, util } = require('chai');
const { get } = require('superagent');
const { response } = require('../app');
const { consoleSandbox } = require('@sentry/utils');

chai.use(chaiHttp);

describe('payment check', async () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generatePaymentFile()
            .then(() => {
                done();
            }).catch(done);
    });

    afterEach((done) => {
        if (agent) {
            agent.close();
        }
        //done();
        utils.removeFile(PAYMENT_FILE_PATH)
            .then(() =>{
                done();
            }).catch(done);
    });

    it('Should generate a random price', (done) => {
        payment.create(req, res);
        setTimeout(() => {
            utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    data.length.should.eql(1);
                    done();
                }).catch(done);
        }, 500);
    });

    it('Should generate 5 random prices', done => {
        let n = 5;
        for (let i = 0; i < n; i++) {
            payment.create(req, res);
        }
        setTimeout(() => {
            utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    data.length.should.eql(n);
                    const uniqKeys = uniq(data);
                    uniqKeys.length.should.eql(data.length);
                    done();
                }).catch(done);
        }, 500);
    });

    it('Should return 5 promo codes', done => {
        chai.request(server)
            .get('/payment/promos')
            .then(promos => {
                promos.body.length.should.eql(5);
                done();
            }).catch(done);
    });

    it('Should apply a discount', done =>{
        chai.request(server)
        .get('/payment/discount')
        .then(response =>{
            utils.getFromFile(PAYMENT_FILE_PATH)
            .then(data =>{
                (response.body.precio - response.body.descuento).toString().should.eql(data[0]);
                done();
            }).catch(done);
        })
    })

    it('Should apply 5 discounts', done =>{
        let n = 5;
        for(let i = 0; i < n; i++)
        {
            chai.request(server)
            .get('payment/discount')
            .then(response =>{
                utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    (response.body.precio - response.body.descuento).toString().should.eql(data[data.length]);
                })
            });
        }
        done();
    });

    it('Should apply 10 discounts', done =>{
        let n = 10;
        for(let i = 0; i < n; i++)
        {
            chai.request(server)
            .get('payment/discount')
            .then(response =>{
                utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    (response.body.precio - response.body.descuento).toString().should.eql(data[data.length]);
                })
            });
        }
        done();
    });
});
