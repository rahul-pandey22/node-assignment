'use strict';

const config = require('./config');
const mysql = require('mysql');

let pool      =    mysql.createPool(config.DbMysql);

module.exports = pool;

