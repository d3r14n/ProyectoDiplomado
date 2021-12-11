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
const { expect } = require('chai');
const { get } = require('superagent');

chai.use(chaiHttp);

describe('payment check', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generatePaymentFile()
            .then(() => {
                done();
            })
    });

    afterEach((done) => {
        if (agent) {
            agent.close();
        }
        //done();
        utils.removeFile(PAYMENT_FILE_PATH)
          .then(() => done() )
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
                })
        }, 500);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    it('Should return 5 promo codes', done => {
        chai.request(server)
            .get('/payment/promos')
            /*.get('/payment/promos', function(req, res) {
                expect(res.body).to.have.lengthOf(5)
                .then( () => done() );
            })*/
            /*
            .end( function(err, res){
                expect(res.body).to.have.lengthOf(5);
            })
            .then( () => done() );]*/
            /*.then(promos => {
                //promos.body.length.should.eql(5)
                expect(promos.body).to.have.lengthOf(5)
                .then( ()=> done() );
            })]/
            .end((err, res) => {
                console.log("LOG: " + JSON.stringify(res));
                should.exist(res.body);
                //res.body.should.have.lengthOf(5);
                res.body.length.should.be.eql(5);
                done();
            })
            /*
            .get('/payment/promos')
            .then(promos => {
                promos.body.length.should().be.eql(5);
                done();
            })*/
            /*
            .get('/payment/promos')
            .then(response => {
                should.equal(response.body.length, 5);
                //response.body.length.should.equal(5)
                done();
            }).catch(done);/
    });]*/
});
