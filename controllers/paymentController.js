'use strict';

const config = require('../config/config');
const httpStatusCode = require('http-status-codes');
const _util = require('../util/customFunctions');
const util = new _util();
const _encryptUtil = require('../util/encryptionHelper');
const encryptUtil = new _encryptUtil();
var constant = require('../config/appConstants');
const jwt = require('jsonwebtoken');
const _model = require("../model/paymentModel");
const model = new _model();
const schemaValidator = require("../schema/paymentSchema");
const inspector = require('schema-inspector');
const _message = require('../util/messageTriggers');
const message = new _message();
const synceach = require('sync-each');
const pageLimit = 10;
const stripe = require("stripe")(config.stripeSecretKey);
var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': config.payPalClientId,
    'client_secret': config.payPalClientSecret
});

class commonController {
    constructor() {}


/**
 * @api {post} /payment/addUserBank addUserBank
 * @apiName addUserBank
 * @apiGroup payment  
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription add End-User Bank
 * @apiParam {String} country (can be "US" or "CA")
 * @apiParam {String} routingNo
 * @apiParam {String} address
 * @apiParam {String} email
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} day
 * @apiParam {String} month
 * @apiParam {String} year
 * @apiParam {String} ssn
 * @apiParam {String} phone
 * @apiParam {String} website
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "success",
    "result": []
}
    *      
    * @apiVersion 1.0.0
    **/
    addUserBank(req, res) {
        console.log("dffffffffffffffffffff");
        const langMsg = config.Msg[req.app.get("lang")];
        try {         
            console.log("sssss");
            var input = req.body;
            const userId = 69;         
            const schema = schemaValidator.addUserBankSchema(langMsg);
            let validationresult = inspector.validate(schema, input);
            if (!validationresult.valid) {
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.badRequest, validationresult.error);
                
            } else {
                model.checkForStripeUser(userId).then(result => {
                    if(result.length > 0){
                        if(input.country == 'US'){
                            var externalAccount = {   
                                "object": "bank_account",
                                "country": input.country,
                                "currency": "usd",
                                "account_holder_name": input.firstName+" "+input.lastName,
                                "routing_number": input.routingNo,
                                "account_number": input.accountNo,
                                }
                        }else{
                            var externalAccount = {   
                                "object": "bank_account",
                                "country": input.country,
                                "currency": "cad",
                                "account_holder_name": input.accountHolderName,
                                "routing_number": input.routingNo, 
                                "account_number": input.accountNo,
                                }
                        }
                        if(result[0].userStripeId != null && result[0].userStripeId != ''){
                            if(result[0].bankStatus == '1'){
                                util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.bankExist, []);
                            }else{
                                
                                stripe.accounts.createExternalAccount(
                                    result[0].userStripeId,
                                    {
                                    external_account: externalAccount,
                                    },
                                    function(err, bank_account) {
                                        if(err){
                                            
                                            let myJSON = JSON.stringify(err);
                                            model.saveStripeResponse(userId,myJSON,'2').then(result => {
                                                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                            }).catch(err => {
                                                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                            });
                                        }else{
                                            
                                            let stipeJSON = JSON.stringify(bank_account);
                                            model.saveUpdateStripeDetail(userId,stipeJSON,'2',bank_account).then(result => {
                                                util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, []);  
                                            }).catch(err => {
                                                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                            });
                                        }
                                        
                                    }
                                );

                            }
                        }else{
                            
                            stripe.accounts.create({
                                type: 'custom',
                                country: input.country,
                                email: result[0].emailAddress,
                                //requested_capabilities: ['card_payments'],
                                business_type:'individual',
                                tos_acceptance: {
                                    date: Math.floor(Date.now() / 1000),
                                    ip: req.connection.remoteAddress // Assumes you're not using a proxy
                                },
                                external_account: externalAccount,
                                business_profile:{
                                    name:"Software",
                                    product_description:"Software"
                                },
                                individual:{
                                    address: {
                                    line1:"1312  Sheppard Ave",
                                    city: "Toronto",
                                    postal_code: "M1S 1T4",
                                    state: "ON"},
                                    dob: {
                                        day:input.day,
                                        month:input.month,
                                        year:input.year},
                                    email: input.email,
                                    first_name: input.firstName,
                                    last_name: input.lastName,
                                    //ssn_last_4: input.ssn,
                                    phone:"4163219615"
                                },
                                business_profile:{
                                    mcc:"5734",
                                    url:"https://aderang.com/"
                                },
                                settings:{payouts:{schedule:{interval:"manual"}}}
                            }, function(err, account) {
                                // asynchronously called
                                
                                if(err){
                                    
                                    let myJSON = JSON.stringify(err);
                                    model.saveStripeResponse(userId,myJSON,'1').then(result => {
                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                    }).catch(err => {
                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                    });
                                }else{

                                    let checkVal = {};
                                    let myJSON = JSON.stringify(account);
                                    let userExAccount = account.id;
                                    
                                    var dataBank = account.external_accounts;
                                    let bankData = dataBank.data[0];

                                    model.saveUpdateStripeDetail(userId,myJSON,'1',bankData).then(result => {
                                        util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, []);  
                                    }).catch(err => {
                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                    });
                                        
                                        // stripe.accounts.createExternalAccount(
                                        //     userExAccount,
                                        //     {
                                        //     external_account: externalAccount,
                                        //     },
                                        //     function(err, bank_account) {
                                        //         if(err){
                                        //             console.log(err);
                                        //             let myJSON = JSON.stringify(err);
                                        //             model.saveStripeResponse(userId,myJSON,'2').then(result => {
                                        //                 util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                        //             }).catch(err => {
                                        //                 util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                        //             });
                                        //         }else{
                                        //             console.log(bank_account);
                                        //             let stipeJSON = JSON.stringify(bank_account);
                                        //             model.saveUpdateStripeDetail(userId,stipeJSON,'1',bank_account).then(result => {
                                        //                 util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, []);  
                                        //             }).catch(err => {
                                        //                 util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                                        //             });
                                        //         }
                                                
                                        //     }
                                        // );
                                        
                                    
                                }
                            });

                        }

                    }else{
                        util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.noRecord, {});
                    }
                    
                }).catch(err => {
                    util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, []);
                });
            }        
        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };

    /**
 * @api {post} /payment/topUp topUp
 * @apiName topUp
 * @apiGroup payment  
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription  business user topUp
 * @apiParam {number} amount transaction amount
 * @apiParam {string} userName user name
 * @apiParam {number} promocodeId promocode id
 * @apiParam {number} totalAmount total amount
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "result": {}
}     
*      
* @apiVersion 1.0.0
**/
    topUp(req, res) {

        const langMsg = config.Msg[req.app.get("lang")];
        try {         
            
            var input = req.body;
            const userId = input.decodedUserId?input.decodedUserId: 0;
              
            const schema = schemaValidator.topUpSchema(langMsg);
            var validationresult = inspector.validate(schema, input);
            if (!validationresult.valid) {                
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.badRequest, validationresult.error);         
            } else {
                let promocodeId = input.promocodeId?input.promocodeId: 0;
                if(promocodeId !=0){
                    model.validatePromocode(userId,promocodeId).then(mVal => {
                        if(mVal.length>0){
                            if(mVal[0].promoType =='1' && mVal[0].userPromoLogId >0){
    
                                util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.promoCodeAlreadyUsed, {});
    
                            }else{
                                let price = input.amount;
                                let discount = (mVal.discount)/100;
                                let discountedAmount =  price - (price*discount);
                                discountedAmount = Math.round(discountedAmount);
                                var chargeAmount = discountedAmount;
                                if(discountedAmount == input.totalAmount){
                                    const create_payment_json = {
                                        "intent": "sale",
                                        "payer": {
                                            "payment_method": "paypal"
                                        },
                                        "redirect_urls": {
                                            "return_url": config.payPalSucessUrl,
                                            "cancel_url": config.payPalCancelUrl
                                        },
                                        "transactions": [{
                                            "amount": {
                                                "currency": "USD",
                                                "total": chargeAmount
                                            },
                                            "description": "This is "+input.userName+" topUp."
                                        }]
                                    };
                                    paypal.payment.create(create_payment_json, function (error, payment) {
                                        if (error) {
                                            let myJSON = JSON.stringify(error);
                                                
                                            model.saveStripeResponse(userId,myJSON,'4').then(result => {
                                                
                                                util.makeJsonResponse(res, false, httpStatusCode.false, err && err.message ? err.message : langMsg.webError, {});
                                            }).catch(err => {
                                                util.makeJsonResponse(res, false, httpStatusCode.false, err && err.message ? err.message : langMsg.webError, {});
                                            });
                                        } else {
                                            for (let i = 0;i < payment.links.length;i++){
                                                if(payment.links[i].rel === 'approval_url'){
                                                    let myJSON = payment;
                                                    let chargeId = payment.id;
                                                    let balanceTransaction = payment.id;
                                                    let created = charge.create_time;
                                                    let type = '4';
                                                    model.enterTransactionDetail(input,myJSON,chargeId,balanceTransaction,created,type).then(result => {
                                                        util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, {'href':payment.links[i].href});
                                                        //res.redirect(payment.links[i].href);
                                                    
                                                    }).catch(err => {
                                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                                                    });
                                                    
                                                }
                                            }
                                            
                                        }
                                    });
                                }else{
                                    util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.tamperingWithAmount, {});  
                                }
                            }
                        }else{
                            util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.promoCodeInvalid, result);
                        }
                    }).catch(err => {
                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                    });

                }else{
                    var chargeAmount = input.amount;
                    const create_payment_json = {
                        "intent": "sale",
                        "payer": {
                            "payment_method": "paypal"
                        },
                        "redirect_urls": {
                            "return_url": config.payPalSucessUrl,
                            "cancel_url": config.payPalCancelUrl
                        },
                        "transactions": [{
                            "amount": {
                                "currency": "USD",
                                "total": chargeAmount
                            },
                            "description": "This is "+input.userName+" topUp."
                        }]
                    };
                    paypal.payment.create(create_payment_json, function (error, payment) {
                        if (error) {
                            let myJSON = JSON.stringify(error);
                                
                            model.saveStripeResponse(userId,myJSON,'4').then(result => {
                                
                                util.makeJsonResponse(res, false, httpStatusCode.false, err && err.message ? err.message : langMsg.webError, {});
                            }).catch(err => {
                                util.makeJsonResponse(res, false, httpStatusCode.false, err && err.message ? err.message : langMsg.webError, {});
                            });
                            throw error;
                        } else {
                            for (let i = 0;i < payment.links.length;i++){
                                if(payment.links[i].rel === 'approval_url'){
                                    let myJSON = payment;
                                    let chargeId = payment.id;
                                    let balanceTransaction = payment.id;
                                    let created = payment.create_time;
                                    let type = '4';
                                    model.enterTransactionDetail(input,JSON.stringify(myJSON),chargeId,balanceTransaction,created,type).then(result => {
                                        
                                        util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, {'href':payment.links[i].href});
                                    
                                    }).catch(err => {
                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                                    });
                                    
                                }
                            }
                            
                        }
                    });

                } 
                
            }

        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };


/**
 * @api {post} /payment/requestPayment requestPayment
 * @apiName requestPayment
 * @apiGroup payment  
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription  payment request by end-user
 * @apiParam {string} userStripeId
 * @apiParam {number} amount transaction amount
 * @apiParam {string} userName user name
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "result": {}
}     
*      
* @apiVersion 1.0.0
**/
    
requestPayment(req, res) {
        const langMsg = config.Msg[req.app.get("lang")];
        try {         
            
            var input = req.body;
            const userId = input.decodedUserId?input.decodedUserId: 0;   
            const schema = schemaValidator.requestPayment(langMsg);
            var validationresult = inspector.validate(schema, input);
            if (!validationresult.valid) {                
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.badRequest, validationresult.error);         
            } else { 
                var chargeAmount = input.amount*100;
                stripe.transfers.create({
                    amount: chargeAmount,
                    currency: "CAD",
                    destination: input.userStripeId,
                    transfer_group: "transfer for "+ input.userName +" of amount "+input.amount
                }, function(err, transfer) {
                    // asynchronously called
                    if(err){

                        let myJSON = JSON.stringify(err);
                            
                        model.saveStripeResponse(userId,myJSON,'5').then(result => {
                            
                            util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                        }).catch(err => {
                            util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                        });
                    }else{
                        let myJSON = JSON.stringify(transfer);
                        model.saveStripeResponse(userId,myJSON,'5').then(result => {
                            stripe.payouts.create({
                                amount: chargeAmount,
                                currency: "CAD", 
                            },
                            {stripe_account: input.userStripeId}, function(err, payout) {
                                
                                if(err){

                                    let myJSON = JSON.stringify(err);
                                    console.log(err);      
                                    model.saveStripeResponse(userId,myJSON,'5').then(result => {
                                        
                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                                    }).catch(err => {
                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                                    });
                                }else{
                                    let myJSON = JSON.stringify(payout);
                                    let chargeId = payout.id;
                                    let balanceTransaction = payout.balance_transaction;
                                    let created = payout.created;
                                    let type = '6';
                                    model.enterTransactionDetail(input,myJSON,chargeId,balanceTransaction,created,type).then(result => {
                                        
                                        util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, {});  

                                    }).catch(err => {
                                        util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                                    });

                                }
                                
                            });
                        }).catch(err => {
                            util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                        });
                        
                    }
                });
                    
            }

        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };


/**
 * @api {get} /payment/getBank 
 * @apiName getBank
 * @apiGroup payment 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription get logged in user bank
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Record updated successfully",
    "result": {
        "id": "ba_1Epw4HCRA9DYX9ZjfyEYhV3u",
        "object": "bank_account",
        "account": "acct_1Epw4ECRA9DYX9Zj",
        "account_holder_name": "Rahul",
        "account_holder_type": null,
        "bank_name": "STRIPE TEST BANK",
        "country": "US",
        "currency": "usd",
        "default_for_currency": true,
        "fingerprint": "3tFGWIyTKRgMtv3q",
        "last4": "1113",
        "metadata": {},
        "routing_number": "110000000",
        "status": "new"
    }
}
        *      
        * @apiVersion 1.0.0
        **/
    getBank(req, res) {
        const langMsg = config.Msg[req.app.get("lang")];
        var returnId = {};
        try {          
            let userId= 69;
            var input = req.body;         
          
            model.getBank(userId).then(mVal => {
                if(mVal.length >0){
                    stripe.accounts.retrieveExternalAccount(
                        mVal[0].userStripeId,
                        mVal[0].userStripeBankId,
                        function(err, external_account) {
                          // asynchronously called
                          if(err){
                            util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                          }else{
                            util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, external_account); 
                          }
                        }
                      );
                    

                }else{
                    util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.noRecord, returnId);
                }
                  
            }).catch(err => {
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
            });
                 
            

        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };

/**
 * @api {put} /payment/deleteBank 
 * @apiName deleteBank
 * @apiGroup payment 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription delete bank of logged in user
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Record updated successfully",
    "result": {
        "id": "ba_1Epw4HCRA9DYX9ZjfyEYhV3u",
        "object": "bank_account",
        "account": "acct_1Epw4ECRA9DYX9Zj",
        "account_holder_name": "Rahul",
        "account_holder_type": null,
        "bank_name": "STRIPE TEST BANK",
        "country": "US",
        "currency": "usd",
        "default_for_currency": true,
        "fingerprint": "3tFGWIyTKRgMtv3q",
        "last4": "1113",
        "metadata": {},
        "routing_number": "110000000",
        "status": "new"
    }
}
        *      
        * @apiVersion 1.0.0
        **/
    deleteBank(req, res) {
        const langMsg = config.Msg[req.app.get("lang")];
        var returnId = {};
        try {          
            let userId= 69;
            var input = req.body;         
          
            model.getBank(userId).then(mVal => {
                if(mVal.length >0){
                    stripe.accounts.deleteExternalAccount(
                        mVal[0].userStripeId,
                        mVal[0].userStripeBankId,
                        function(err, external_account) {
                          // asynchronously called
                          if(err){
                            util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                          }else{
                            util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, confirmation); 
                          }
                        }
                      );
                    

                }else{
                    util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.noRecord, returnId);
                }
                  
            }).catch(err => {
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
            });
                 
            

        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };


/**
* @api {get} /payment/validatePromocode validatePromocode
* @apiName validatePromocode
* @apiGroup payment
* @apiHeader {String} content-type application/json
* @apiHeader {String} authorization
* @apiDescription get detail of email
* @apiParam  {number} promocodeId (promo code)
* @apiSuccess {boolean} status           true/false
* @apiSuccess {Number}  statusCode       universal status code
* @apiSuccess {String}  message   response message string
* @apiSuccess {Object}  result    result
* @apiSuccessExample {json} Success-Response:
*  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "result": {
        "discount": 10
    }
}
    *
    * @apiVersion 1.0.0
    **/
   validatePromocode(req, res) {
        const langMsg = config.Msg[req.app.get("lang")];
        
        try {
            var input = req.body;
            const promocodeId = req.params.promocodeId;
            let userId= input.decodedUserId?input.decodedUserId: 20;
            var result = {};
            
            model.validatePromocode(userId,promocodeId).then(mVal => {
                if(mVal.length>0){
                    if(mVal[0].promoType =='1' && mVal[0].userPromoLogId >0){

                        util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.promoCodeAlreadyUsed, result);
                    }else{
                        result.discount =mVal[0].discount;
                        util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, result);
                    }
                    

                }else{
                    util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.noRecord, result);
                }
            }).catch(err => {
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, result);
            });

        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };

/**
* @api {post} /payment/payout payout
* @apiName payout
* @apiGroup payment 
* @apiHeader {String} content-type application/json
* @apiHeader {String} authorization
* @apiDescription payout to paypal users
* @apiParam  {string} paypalEmail (payPal registered email)
* @apiParam  {number} amount (amount to transfer)
* @apiSuccess {boolean} status           true/false
* @apiSuccess {Number}  statusCode       universal status code
* @apiSuccess {String}  message          response message string
* @apiSuccess {Object}  result             result
* @apiSuccessExample {json} Success-Response:
*  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Record updated successfully",
    "result": {
        
    }
}
*      
* @apiVersion 1.0.0
**/
    payout(req, res) {
        const langMsg = config.Msg[req.app.get("lang")];
        var returnId = {};
        try {          
            
            var input = req.body;         
            const userId = input.decodedUserId?input.decodedUserId: 0;
            
            const schema = schemaValidator.payout(langMsg);
            var validationresult = inspector.validate(schema, input);
            
            if (!validationresult.valid) {                
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.badRequest, validationresult.error);         
            } else { 
                model.checkAmount(userId,input.amount).then(mVal => {
                    if(mVal.length >0){
                        
                        var sender_batch_id = Math.random().toString(36).substring(9);   
                        var create_payout_json = {
                            "sender_batch_header": {
                                "sender_batch_id": sender_batch_id,
                                "email_subject": "You have a payment"
                            },
                            "items": [
                                {
                                    "recipient_type": "EMAIL",
                                    "amount": {
                                        "value": input.amount,
                                        "currency": "USD"
                                    },
                                    "receiver": input.paypalEmail,
                                    "note": "Thank you.",
                                    "sender_item_id": "item_3"
                                }
                            ]
                        };
                        var sync_mode = 'false';

                        paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
                            if (error) {
                                let errorMessage = error.response;
                                console.log(error.response);
                                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, error && errorMessage ? errorMessage.message : langMsg.webError, {});
                            } else {
                                
                                let myJSON = JSON.stringify(payout);
                                var id = payout.batch_header;
                                let chargeId = id.payout_batch_id;
                                let balanceTransaction = id.payout_batch_id;
                                let created = Math.floor(Date.now() / 1000);
                                let type = '6';
                                    
                                model.enterTransactionDetail(input,myJSON,chargeId,balanceTransaction,created,type).then(mVal => {
                                    util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, {});
                                }).catch(err => {
                                    util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                                });
                                
                            }
                        });
                        
                    }else{
                        util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.notEnoughAmount, {});
                    }
                    
                }).catch(err => {
                    util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                });
                 
            }

        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };


/**
 * @api {post} /payment/success payout success
 * @apiName success
 * @apiGroup payment 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription paypal business user TopUp success
 * @apiParam  {string} PayerID (payPal PayerID)
 * @apiParam  {string} paymentId (paymentId)
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Record updated successfully",
    "result": {
        
    }
}
        *      
        * @apiVersion 1.0.0
        **/
    success(req, res) {
        const langMsg = config.Msg[req.app.get("lang")];
        var returnId = {};
        try {          
            
            var input = req.body;
            const payerId = input.PayerID;
            const paymentId = input.paymentId;
            
            paypal.payment.get(paymentId, function (error, payment) {
                if (error) {
                    util.makeJsonResponse(res, false, httpStatusCode.OK, error && errorMessage ? errorMessage.message : langMsg.webError, {});
                } else {
                    const execute_payment_json = {
                        "payer_id": payerId,
                        "transactions": [{
                            "amount": {
                                "currency": "USD",
                                "total": payment.transactions[0].amount.total
                            }
                        }]
                    };
                    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                        if (error) {
                            console.log(error.response);
                            util.makeJsonResponse(res, false, httpStatusCode.OK, error && errorMessage ? errorMessage.message : langMsg.webError, {});
                        } else {
                            
                            let myJSON = JSON.stringify(payment);
                            let chargeId = paymentId;
                            let balanceTransaction = paymentId;
                            let created = payment.create_time;
                            let type = '5';
                            input.amount=payment.transactions[0].amount.total;
                            model.enterTransactionDetail(input,myJSON,chargeId,balanceTransaction,created,type).then(result => {
        
                                util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, {'amount':payment.transactions[0].amount.total});  
                            
                            }).catch(err => {
                                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, {});
                            });
                        }
                    });
                    
                }
            
            });      
            
               
        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }
    };


/**
 * @api {get} /payment/getUserTransaction getUserTransaction
 * @apiName getUserTransaction
 * @apiGroup payment 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription get logged in user Transactions
 * @apiParam {int} pageNo
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "success",
    "result": {
        "list": [
            {
                "transactionHistoryId": 2,
                "transactionId": "PAYID-LVXG3AA3NX83801JR4270415",
                "transactionAt": "2019-09-03T13:41:19Z",
                "transferAmount": 100,
                "createdAt": "2019-09-03T13:41:20.000Z",
                "totalCount": 2
            },
            {
                "transactionHistoryId": 1,
                "transactionId": "PAYID-LVXG2RQ708504294H7085233",
                "transactionAt": "2019-09-03T13:40:22Z",
                "transferAmount": 100,
                "createdAt": "2019-09-03T13:40:22.000Z",
                "totalCount": 2
            }
        ],
        "totalCount": 2
    }
}
        *      
        * @apiVersion 1.0.0
        **/
       getUserTransaction(req, res) {
        const langMsg = config.Msg[req.app.get("lang")];
        var returnId = {};
        try {          
            var input = req.query;
            req.query.pageNo = req.query.pageNo?parseInt(req.query.pageNo): 0;
            var pageNo = req.query.pageNo || 1;
            var offset = (pageNo - 1) * pageLimit;       
            const schema = schemaValidator.getUserTransaction(langMsg);
            let userId = req.body.decodedUserId?req.body.decodedUserId: 0;
            var validationresult = inspector.validate(schema, input);
            var result = {};
            if (!validationresult.valid) {
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.badRequest, validationresult.error);

            } else {
                model.getUserTransaction(userId, pageLimit, offset).then(mVal => {
                    if (mVal.length > 0) {
                        result.list = mVal;
                        result.totalCount = mVal[0].totalCount;
                        util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, result);
                    } else {
                        util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.noRecord, result);
                    }
                }).catch(err => {
                    util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, err && err.message ? err.message : langMsg.webError, result);
                });
            }
        } catch (e) {
            console.log(e);
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, {});
        }

    };

}
module.exports = commonController;