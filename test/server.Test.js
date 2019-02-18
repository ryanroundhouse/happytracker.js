'use strict';

var mongoose = require('mongoose');
require("../api/models/happyModel");
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
var winston = require('../config/winston'); //import logging config
winston.transports.forEach((t) => (t.silent = true));

chai.use(chaiHttp);
const server = require('../server.js')

after(function (done) {
  mongoose.connection.db.dropDatabase(function () {
    mongoose.connection.close(function () {
          done();
      });
  });
});

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
  
  describe('add a mood tests', function(){
    it('add a mood should fail when name not supplied', function(){
      let testMood = {
      }
      return chai.request(server)
        .post('/moods')
        .send(testMood)
        .then(function(res){
          expect(res.body.errors.name.path).equals('name');
        });
    });

    it('add a mood should fail when date not supplied', function(){
      let testMood = {
        name: "Ryan Graham"
      }
      return chai.request(server)
        .post('/moods')
        .send(testMood)
        .then(function(res){
          expect(res.body.errors.date.path).equals('date');
        });
    });

    it('add a mood should fail when a mood not supplied', function(){
      let testMood = {
        name: "Ryan Graham",
        date: Date.now()
      }
      return chai.request(server)
        .post('/moods')
        .send(testMood)
        .then(function(res){
          expect(res.body.errors.mood.path).equals('mood');
        });
    });

    it('add a mood should return a 400 on failed add body', function(){
      let testMood = {
        name: "Ryan Graham",
        date: Date.now()
      }
      return chai.request(server)
        .post('/moods')
        .send(testMood)
        .then(function(res){
          expect(res.body.errors.mood.path).equals('mood');
        });
    });
    
    it('add a mood should return an error on an invalid mood', function(){
      let testMood = {
        name: "Ryan Graham",
        date: Date.now(),
        mood: 'super duper'
      }
      return chai.request(server)
        .post('/moods')
        .send(testMood)
        .then(function(res){
          expect(res.body.errors.mood.path).equals('mood');
        });
    });

    it('add a mood should succeed', function(){
      let testMood = {
        name: "Ryan Graham",
        date: Date.now(),
        mood: "ok"
      }
      return chai.request(server)
        .post('/moods')
        .send(testMood)
        .then(function(res){
          expect(res).to.have.status(200);
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
  
  describe('update a mood tests', function(){
    it('should get an empty result on updating a mood entry that doesn\'t exist', function(){
        let testMood = {
          name: "Ryan Graham",
          date: Date.now(),
          mood: 'super duper'
        }
        return chai.request(server)
        .put('/moods/moodIdThatDoesntExist')
        .send(testMood)
        .then(function(res) {
          expect(res.body.results).to.be.undefined;
        });
      });

  });
});