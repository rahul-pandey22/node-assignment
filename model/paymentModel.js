"use strict";

var mysql = require('mysql');
var connection = require('../config/sqlConnector');
var constant = require('../config/appConstants');
var promise    = require("promise");

class commonModel {

    constructor() { }
    
    saveStripeResponse(id,res,rType) {
        var response = [];
        return new promise(function (resolve, reject) {
            try { 
                  //console.log("ddd"+id)           
                var query = "CALL saveStripeResponse(?,?,?)";
                var valueArr = [id,res,rType]; 
                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        reject(response);
                    }else{

                        resolve(results[0]);
                    }           

            });
        } catch (err) {           
            reject(err);
        }
        });
    }

    saveStripeBankResponse(id) {
        var response = [];
        return new promise(function (resolve, reject) {
            try { 
                  //console.log("ddd"+id)           
                var query = "CALL saveStripeBankResponse(?)";
                var valueArr = [id]; 
                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        reject(response);
                    }else{

                        resolve(results[0]);
                    }           

            });
        } catch (err) {           
            reject(err);
        }
        });
    }

    checkForStripeUser(userId) {        
        return new promise(function (resolve, reject) {
            try { 
                  //console.log("ddd"+id)
                let response = [];
                //let userId = data.decoded_user_id?data.decoded_user_id: 0;                 
                let query = "CALL checkForStripeUser(?)";
                console.log(userId);
                let valueArr = [userId]; 
                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        reject(error);
                    }else{
                        
                        resolve(results[0]);
                    }           

            });
        } catch (err) {           
            reject(err);
        }
        });
    }

        saveUpdateStripeDetail(userId,res,rType,bankData) {        
        return new promise(function (resolve, reject) {
            try { 
                  //console.log("ddd"+id)
                let response = [];
                let id = bankData.id;
                let fingerprint = bankData.fingerprint;
                let account = bankData.account;                 
                let query = "CALL saveUpdateStripeDetail(?,?,?,?,?,?)";
                
                let valueArr = [userId,res,rType,id,fingerprint,account];

                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        console.log(error);
                        reject(error);
                    }else{
                        
                        resolve(results[0]);
                    }           

                });
            } catch (err) {           
                reject(err);
            }
        });
    }


    enterTransactionDetail(data,charge,chargeId,balanceTransaction,created,type) {        
        return new promise(function (resolve, reject) {
            try { 
                  //console.log("ddd"+id)
                let response = [];
                
                let amount = data.amount;
                let userId = data.decodedUserId?data.decodedUserId: 0;
                

                let query = "CALL enterTransactionDetail(?,?,?,?,?,?,?)";
                
                let valueArr = [userId,amount,charge,chargeId,balanceTransaction,created,type];

                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        console.log(error);
                        reject(error);
                    }else{
                        
                        resolve(results[0]);
                    }           

                });
            } catch (err) {           
                reject(err);
            }
        });
    }

    getBank(userId) {        
        return new promise(function (resolve, reject) {
            try { 
                  //console.log("ddd"+id)
                let response = [];
                
                let userId = 63;
                
                let query = "CALL getBank(?)";
                
                let valueArr = [userId];

                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        console.log(error);
                        reject(error);
                    }else{
                        
                        resolve(results[0]);
                    }           

                });
            } catch (err) {           
                reject(err);
            }
        });
    }

    validatePromocode(userId,promocodeId) {        
        return new promise(function (resolve, reject) {
            try { 

                let query = "CALL validatePromocode(?,?)";
                
                let valueArr = [userId,promocodeId];

                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        console.log(error);
                        reject(error);
                    }else{
                        
                        resolve(results[0]);
                    }           

                });
            } catch (err) {           
                reject(err);
            }
        });
    }

    checkAmount(userId,amount) {        
        return new promise(function (resolve, reject) {
            try { 

                let query = "CALL checkAmount(?,?)";
                
                let valueArr = [userId,amount];

                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        console.log(error);
                        reject(error);
                    }else{
                        
                        resolve(results[0]);
                    }           

                });
            } catch (err) {           
                reject(err);
            }
        });
    }

    getUserTransaction(userId, pageLimit, offset) {        
        return new promise(function (resolve, reject) {
            try { 

                let query = "CALL getUserTransaction(?,?,?)";
                
                let valueArr = [userId, pageLimit, offset];

                connection.queryHandler(query, valueArr, true,function(error, results, fields) {
                    if (error){
                        console.log(error);
                        reject(error);
                    }else{
                        
                        resolve(results[0]);
                    }           

                });
            } catch (err) {           
                reject(err);
            }
        });
    }
}

module.exports = commonModel;