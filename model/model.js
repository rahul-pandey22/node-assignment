"use strict";

const mysql = require('mysql');
const connection = require('../config/sqlConnector');
const constant = require('../config/appConstants');
const promise    = require("promise");

const commonModel = {}


    commonModel.login= (data) =>{
        let response = [];
        return new promise( (resolve, reject) => {
            try {            
                const query = "CALL sp_login(?,?)";
                const valueArr = [data.emailAddress,data.password];

                connection.queryHandler(query, valueArr, false,(error, results, fields) => {
                    if (error)
                        reject(response);
                    else 
                        resolve(results[0][0]);            

                });
            } catch (err) {           
                reject(err);
            }
        });
    }

    commonModel.insertToken= (data) => {
        let response = [];
        return new promise( (resolve, reject) => {
            try {                  
                const query = "CALL sp_insertToken(?,?)";
                const valueArr = [data.refreshToken,data.userId];

                connection.queryHandler(query, valueArr, false,(error, results, fields) => {
                    if (error)
                        reject(response);
                    else 
                        resolve(results[0]);           
    
                });
            } catch (err) {
                          
                reject(err);
            }
        });
    }

    commonModel.checkValidUser= (userId) =>{
        let response = [];
        return new promise( (resolve, reject) => {
            try {
            //check if user exist
                const query = "CALL sp_checkValidUser(?)";
                const valueArr = [userId];

                connection.queryHandler(query, valueArr, false,(error, results, fields) => {
                    if (error){
                        reject(error);
                        
                    }else if(results[0].length > 0)
                    {
                        
                        resolve(results[0]);   

                    }else {
                        reject("Not found");
                    }         

                });
            } catch (err) {
            
                reject(err);
            }
        });
    }

    commonModel.categoies= (data) =>{
        
        return new promise((resolve, reject) => {
            try {
            //get categories
                var query = "CALL sp_categoies()";
                var valueArr = [];

                connection.queryHandler(query, valueArr, false,function(error, results, fields) {
                    if (error){
                    
                        reject(error);
                    
                    }else {
                        console.log(results[0]);
                        resolve(results[0]); 
                    }         

                });
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }

    commonModel.products= (categoryId) =>{
        
        return new promise((resolve, reject) => {
            try {
            //get products
                var query = "CALL sp_products(?)";
                var valueArr = [categoryId];

                connection.queryHandler(query, valueArr, false,function(error, results, fields) {
                    if (error){
                    
                        reject(error);
                    
                    }else {
                        console.log(results[0]);
                        resolve(results[0]); 
                    }         

                });
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }

    commonModel.cart= (data) =>{
        
        return new promise((resolve, reject) => {
            try {
            //insert into cart
                var query = "CALL sp_addCart(?,?)";
                var valueArr = [data.decodedUserId,data.productId];

                connection.queryHandler(query, valueArr, false,function(error, results, fields) {
                    if (error){
                    
                        reject(error);
                    
                    }else {
                        console.log(results[0]);
                        resolve(results[0]); 
                    }         

                });
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }
    
    commonModel.getCart= (data) =>{
        
        return new promise((resolve, reject) => {
            try {
            //get cart
                var query = "CALL sp_getCart(?)";
                var valueArr = [data.decodedUserId];

                connection.queryHandler(query, valueArr, false,function(error, results, fields) {
                    if (error){
                    
                        reject(error);
                    
                    }else {
                        console.log(results[0]);
                        resolve(results[0]); 
                    }         

                });
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }


module.exports = commonModel;