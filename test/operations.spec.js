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

chai.use(chaiHttp);

describe('Operations', async () => {
    let req, res, next, agent;

    describe('Sums', async() => {
        it('2 + 2', (done) => {
            chai.request(server)
            .get('/operations/sum/2/2')
            .then(res =>{
                res.body.should.eql(4);
                done();
            }).catch(done);
        });

        it('10 + 13', (done) => {
            chai.request(server)
            .get('/operations/sum/10/13')
            .then(res =>{
                res.body.should.eql(23);
                done();
            }).catch(done);
        });

        it('87 + 78', (done) => {
            chai.request(server)
            .get('/operations/sum/87/78')
            .then(res =>{
                res.body.should.eql(165);
                done();
            }).catch(done);
        });

        it('297 + 959', (done) => {
            chai.request(server)
            .get('/operations/sum/297/959')
            .then(res =>{
                res.body.should.eql(1256);
                done();
            }).catch(done);
        });
    })

    describe('Substracts', async() => {
        it('7 - 4', (done) => {
            chai.request(server)
            .get('/operations/substract/7/4')
            .then(res =>{
                res.body.should.eql(3);
                done();
            }).catch(done);
        });

        it('12 - 25', (done) => {
            chai.request(server)
            .get('/operations/substract/12/25')
            .then(res =>{
                res.body.should.eql(-13);
                done();
            }).catch(done);
        });

        it('60 - 50', (done) => {
            chai.request(server)
            .get('/operations/substract/60/50')
            .then(res =>{
                res.body.should.eql(10);
                done();
            }).catch(done);
        });

        it('333 - 737', (done) => {
            chai.request(server)
            .get('/operations/substract/333/737')
            .then(res =>{
                res.body.should.eql(-404);
                done();
            }).catch(done);
        });
    })

    describe('Multiplications', async() => {
        it('5 * 4', (done) => {
            chai.request(server)
            .get('/operations/multiply/5/4')
            .then(res =>{
                res.body.should.eql(20);
                done();
            }).catch(done);
        });

        it('44 * 43', (done) => {
            chai.request(server)
            .get('/operations/multiply/44/43')
            .then(res =>{
                res.body.should.eql(1892);
                done();
            }).catch(done);
        });

        it('95 + 50', (done) => {
            chai.request(server)
            .get('/operations/multiply/95/50')
            .then(res =>{
                res.body.should.eql(4750);
                done();
            }).catch(done);
        });

        it('865 + 977', (done) => {
            chai.request(server)
            .get('/operations/multiply/865/977')
            .then(res =>{
                res.body.should.eql(845105);
                done();
            }).catch(done);
        });
    })

    describe('Divisions', async() => {
        it('10 / 0', (done) => {
            chai.request(server)
            .get('/operations/divide/10/0')
            .then(res =>{
                res.body.should.eql("inf");
                done();
            }).catch(done);
        });

        it('21 / 35', (done) => {
            chai.request(server)
            .get('/operations/divide/21/35')
            .then(res =>{
                res.body.should.eql(0.6);
                done();
            }).catch(done);
        });

        it('96 / 16', (done) => {
            chai.request(server)
            .get('/operations/divide/96/16')
            .then(res =>{
                res.body.should.eql(6);
                done();
            }).catch(done);
        });

        it('831 / 3', (done) => {
            chai.request(server)
            .get('/operations/divide/831/3')
            .then(res =>{
                res.body.should.eql(277);
                done();
            }).catch(done);
        });
    })
});
