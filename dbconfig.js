const seq = require('sequelize');
const mysql = require('mysql2/promise');
// var username='root'
// var password='sairam493@SCHOOL'
// var dbname='mysql'

var username
var password
var dbname

const {Sequelize,DataTypes} = seq;
async function DBConfig () {
    try {
        process.argv.forEach(function (val, index, array) {
            if (val.includes('username')) {
                username = val.split("=")[1]
            }
            if (val.includes('password')) {
                password = val.split("=")[1]
            }
            if (val.includes('dbname')) {
                dbname = val.split("=")[1]
            }
        });
        
        
        var con =  mysql.createConnection({
            host: "localhost",
            user: username,
            password: password
        });

        let res = await con;  
        let createdb = await res.query("CREATE DATABASE if not exists redlink")
        await res.query("use redlink ");


        global.sequelizeORM = new Sequelize('redlink', username, password,{
            host: 'localhost',
            dialect: 'mysql',
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        const Tutorial = global.sequelizeORM.define("tutorial", {
            title: {
            type: Sequelize.STRING
            },
            description: {
            type: Sequelize.STRING
            },
            published: {
            type: Sequelize.BOOLEAN
            },
            name: {
            type: Sequelize.STRING
            }
        });
        console.log("TUTORIAL",Tutorial)
    }catch(e) {
        console.log("ERROR ", e)
    }
}

module.exports = {
    DBConfig,
    DataTypes,
    seq,
};
