var config = {
	host : "ec2-54-247-95-125.eu-west-1.compute.amazonaws.com",
	database : "d9kbrh4nqmmj1k",
	username : "mkcavcakrcatei",
	port : "5432",
	password : "1402a352aa9882d638c033884ebcc694b56dfd010eb2edd77a3368f601c71d34",
	uri : "postgres://mkcavcakrcatei:1402a352aa9882d638c033884ebcc694b56dfd010eb2edd77a3368f601c71d34@ec2-54-247-95-125.eu-west-1.compute.amazonaws.com:5432/d9kbrh4nqmmj1k"
}

console.log('HOST + PORT = '+config.host+":"+config.port);

const Sequelize = require('sequelize');
// const sequelize = new Sequelize('database', 'username', 'password', {
const sequelize = new Sequelize(config.database, config.username, config.password, {
	// host: config.host+":"+config.port,
	host: config.host,
	port: config.port,
	dialect: 'postgres',
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}

});

sequelize
.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});

// const User = sequelize.define('user', {
// 	username: Sequelize.STRING,
// 	birthday: Sequelize.DATE
// });

// sequelize.sync()
// .then(() => User.create({
// 	username: 'janedoe',
// 	birthday: new Date(1980, 6, 20)
// }))
// .then(jane => {
// 	console.log(jane.toJSON());
// });

// // Or you can simply use a connection uri
// const sequelize = new Sequelize(uri);

module.exports = sequelize;