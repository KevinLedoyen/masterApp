var host = "ec2-54-247-95-125.eu-west-1.compute.amazonaws.com";
var database = "d9kbrh4nqmmj1k";
var username = "mkcavcakrcatei";
var port = "5432";
var password = "1402a352aa9882d638c033884ebcc694b56dfd010eb2edd77a3368f601c71d34";
var uri = "postgres://mkcavcakrcatei:1402a352aa9882d638c033884ebcc694b56dfd010eb2edd77a3368f601c71d34@ec2-54-247-95-125.eu-west-1.compute.amazonaws.com:5432/d9kbrh4nqmmj1k";



const Sequelize = require('sequelize');
// const sequelize = new Sequelize('database', 'username', 'password', {
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

// // Or you can simply use a connection uri
// const sequelize = new Sequelize(uri);

module.exports = Sequelize;