'use strict';

require('dotenv').config();
const env = process.env.NODE_ENV; // 'dev' or 'prod'

//import app Constant
const appConstant = require('./appConstants');

//import language
const message = require('../locales/messages');

const dev = {
    App: {
        Port: process.env.PORT || 8080,
        Http: ''
    },
    Smtp: {
        username: '',
        password: '',
        host: '',
        from: '',
        port:25
    },
    DbMysql: {
        host: "localhost",
        user: "root",
        password: "flip.sit",
        database: "crownstack",
        multipleStatements: true,
        charset : 'utf8mb4' ,
        debug   :  false,
        connectionLimit : 100
    },
    AnonymousReqSecret:{
        Web:'915961CD8EC45C16C65EB07DC376D2BC24B81B7E5D9402CC0936185BF8C7E295'       
    },
    Constant: appConstant,
    Msg: message,
    secret: '110ec58aa0f24ac48393c866d813b8d1',
    refreshSecret: 'jdfh&^$%$#*&454dfgh5dg555rahP8764we654we64&^GHDD',
    AesSecretKey: '08277A08B0ABA70703E28A5FCED7396D',
    AesSecretIVKey: 'D9062EA86462F77E',
};
const prod = {
    App: {
        Port: process.env.PORT || 8080,
        Http: ''
    },
    Smtp: {
        username: '',
        password: '',
        host: '',
        from: '',
        port:25
    },
    DbMysql: {
        host: "localhost",
        user: "root",
        password: "flip.sit",
        database: "aderang",
        multipleStatements: true,
        charset : 'utf8mb4' ,
        debug   :  false,
        connectionLimit : 100
    },
    AnonymousReqSecret:{
        Web:'915961CD8EC45C16C65EB07DC376D2BC24B81B7E5D9402CC0936185BF8C7E295'       
    },
    Constant: appConstant,
    Msg: message,
    secret: '110ec58aa0f24ac48393c866d813b8d1',
    refreshSecret: 'jdfh&^$%$#*&454dfgh5dg555rahP8764we654we64&^GHDD',
    AesSecretKey: '08277A08B0ABA70703E28A5FCED7396D',
    AesSecretIVKey: 'D9062EA86462F77E'
};
const config = { dev, prod};

module.exports = config[env];

