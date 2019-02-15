'use strict';

var mongoose = require('mongoose');
require("../api/models/happyModel");
const chai = require('chai');
const chaiHttp = require('chai-http')
const expect = require('chai').expect;

chai.use(chaiHttp);
const server = require('../server.js')

describe('happyController Tests', function(){

  describe('invalid URL tests', function(){
    it('should receive 404 on invalid URI', function(){
        return chai.request(server)
          .get('/moodsINVALID')
          .then(function(res) {
            expect(res).to.have.status(404);
          });
    });

    it('should receive json body on invalid URI', function(){
          return chai.request(server)
            .get('/moodsINVALID')
            .then(function(res) {
              expect(res).to.be.json;
            });
      });
  });

  describe('get all mods tests', function(){
    it('should receive 200 on get all moods', function(){
        return chai.request(server)
          .get('/moods')
          .then(function(res) {
            expect(res).to.have.status(200);
          });
    });

    it('should receive json body on get all moods', function(){
          return chai.request(server)
            .get('/moods')
            .then(function(res) {
              expect(res).to.be.json;
            });
      });
  });
    
  describe('get a mood tests', function(){
    it('should get undefined on mood that doesn\'t exist', function(){
      return chai.request(server)
        .get('/moods/moodIdThatDoesntExist')
        .then(function(res) {
          expect(res.body.results).to.be.undefined;
        });
      });

      it('should get json body on mood that doesn\'t exist', function(){
        return chai.request(server)
          .get('/moods/moodIdThatDoesntExist')
          .then(function(res) {
            expect(res).to.be.json;
          });
        });

      it('should get 404 on mood that doesn\'t exist', function(){
        return chai.request(server)
          .get('/moods/moodIdThatDoesntExist')
          .then(function(res) {
            expect(res).to.have.status(404);
          });
        });
  });
});