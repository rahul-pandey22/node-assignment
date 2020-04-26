'use strict';

const config = require('./config');
const mysql = require('mysql');

var pool      =    mysql.createPool(config.DbMysql);

module.exports = pool;

