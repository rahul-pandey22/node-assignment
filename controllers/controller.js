
const config = require('../config/config');
const httpStatusCode = require('http-status-codes');
const _util = require('../util/customFunctions');
const util = new _util();
const _encryptUtil = require('../util/encryptionHelper');
const encryptUtil = new _encryptUtil();
const constant = require('../config/appConstants');
const jwt = require('jsonwebtoken');
const service = require("../services/services");
const schemaValidator = require("../schema/schema");
const inspector = require('schema-inspector');
const _message = require('../util/messageTriggers');
const message = new _message();
const synceach = require('sync-each');



/**
 * @api {post} /crownStackService/login login-user
 * @apiName login
 * @apiGroup userService 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription User login 
 * @apiParam {String} emailAddress User's email id
 * @apiParam {String} password User's account password
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
* @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
    {
    "status": true,
    "statusCode": 200,
    "message": "Login successfully",
    "result": {
        "userId": 93,
        "password": "2d6d01839f87ad1d28a8d61198a97b8d",
        "firstName": "rahul",
        "lastName": "pandey",
        "emailAddress": "rahul.22@yopmail.com",
        "isDeleted": "0",
        "isBlocked": "0",
        "blockedBy": "0",
        "blockedAt": null,
        "offset": null,
        "createdAt": "2020-04-26T13:53:32.000Z",
        "updatedAt": "2020-04-26T16:15:27.000Z",
        "checkStatus": 3,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkzLCJpYXQiOjE1ODc5MjAxMTUsImV4cCI6MTU4ODAwNjUxNX0.ei_UuE8zmP_TtlcXcTkFGezHZBUTnTEmT2mlOWuEU4c",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkzLCJpYXQiOjE1ODc5MjAxMTUsImV4cCI6MTU4OTIxNjExNX0.0VL2WJAhSZdei5LjC09ath__rXURpcmJtSXj8cliQRA"
    }
}

*      
* @apiVersion 1.0.0
**/


exports.login = async (req, res)  => {

    const langMsg = config.Msg[req.app.get("lang")];

    try {
        let input = req.body;            
        const schema = schemaValidator.loginSchema();
        let validationresult = inspector.validate(schema, input);
                    
        if (!validationresult.valid) {               
            
            util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.badRequest, validationresult.error);               
        
        } else {
            
            input.password = encryptUtil.aesEncript(input.password);
            
            let user = await service.login(input);

            switch(user) {

                case user.checkStatus === 1:  // For Invalid Email
                    util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.invalidEmailId, []);
                
                case user.checkStatus === 2:  // For Invalid Password
                    util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.invalidPassword, []);

                case user.isBlocked == '1':  // For blocked user
                    util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.userBlocked, []);
                
                default:

                    user.accessToken = encryptUtil.jwtToken(user.userId,constant.tokenType.accessToken);
                    user.refreshToken = encryptUtil.jwtToken(user.userId,constant.tokenType.refreshToken);
                    
                    const check = await service.insertToken(user);
                    
                    util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.loginSuccess, user);                    
            }

        }
    } catch (e) {
        
        util.makeJsonResponse(res, false,httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, []);
    }
}

/**
 * @api {get} /crownStackService/categoies get category master
 * @apiName categoies
 * @apiGroup category 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription get category master
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
    "result": [
        {
            "categoryId": 93,
            "name": "Nikon",
            "model": 2018,
            "type": "Mirrorless",
            "createdAt": "2020-04-26T17:13:19.000Z",
            "updatedAt": null
        },
        {
            "categoryId": 94,
            "name": "Canon",
            "model": 2019,
            "type": "Mirrorless",
            "createdAt": "2020-04-26T17:13:19.000Z",
            "updatedAt": null
        }
    ]
}

*      
* @apiVersion 1.0.0
**/

exports.categoies = async (req, res)  => {

    const langMsg = config.Msg[req.app.get("lang")];

    try {

            let categoies = await service.categoies();
            
            if(categoies.length > 0){

                util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, categoies);

            }else{

                util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.notFound, []);
                                       
            }

    } catch (e) {
        console.log(e);
        
        util.makeJsonResponse(res, false,httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, []);
    }
}

/**
 * @api {get} /crownStackService/products get products master
 * @apiName products
 * @apiGroup products 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription get products master
 * @apiSuccess {Boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
* @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "result": [
        {
            "productId": 93,
            "categoryId": 93,
            "name": "Nikon 1",
            "description": "description",
            "price": 10,
            "make": 2019,
            "createdAt": "2020-04-26T19:40:25.000Z",
            "updatedAt": null
        },
        {
            "productId": 94,
            "categoryId": 93,
            "name": "Nikon 2",
            "description": "description",
            "price": 20,
            "make": 2020,
            "createdAt": "2020-04-26T19:40:25.000Z",
            "updatedAt": null
        },
        {
            "productId": 95,
            "categoryId": 94,
            "name": "Canon 1",
            "description": "description",
            "price": 30,
            "make": 2019,
            "createdAt": "2020-04-26T19:40:25.000Z",
            "updatedAt": null
        },
        {
            "productId": 96,
            "categoryId": 94,
            "name": "Canon 2",
            "description": "description",
            "price": 40,
            "make": 2020,
            "createdAt": "2020-04-26T19:40:25.000Z",
            "updatedAt": null
        }
    ]
}

*      
* @apiVersion 1.0.0
**/

exports.products = async (req, res)  => {

    const langMsg = config.Msg[req.app.get("lang")];

    try {

            let categoryId = 0;

            if(req.params.categoryId){

                categoryId = req.params.categoryId;

            }

            let products = await service.products(categoryId);
            
            if(products.length > 0){

                util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, products);

            }else{

                util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.notFound, []);
                                       
            }

    } catch (e) {
        console.log(e);
        
        util.makeJsonResponse(res, false,httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, []);
    }
}



/**
 * @api {post} /crownStackService/cart insert into cart
 * @apiName cart
 * @apiGroup cart 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription insert into cart 
 * @apiParam {Number} productId product id to insert
 * @apiSuccess {Boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
* @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
{
    "status": true,
    "statusCode": 200,
    "message": "Successfully added",
    "result": [
        {
            "checkId": 1
        }
    ]
}

*      
* @apiVersion 1.0.0
**/

exports.cart = async (req, res)  => {

    const langMsg = config.Msg[req.app.get("lang")];

    try {

        let input = req.body;

        const schema = schemaValidator.cartSchema();
        let validationresult = inspector.validate(schema, input);
                    
        if (!validationresult.valid) {               
            
            util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.badRequest, validationresult.error);               
        
        } else {


            let cart = await service.cart(input);
            
            if(cart[0]['checkId'] == 1){

                util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.successAdded, cart);

            }else{

                util.makeJsonResponse(res, false, httpStatusCode.OK, langMsg.already, []);
                                       
            }
        }

    } catch (e) {
        console.log(e);
        
        util.makeJsonResponse(res, false,httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, []);
    }
}


/**
 * @api {get} /crownStackService/cart get cart
 * @apiName getCart
 * @apiGroup cart 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} authorization
 * @apiDescription get cart
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
    "result": [
        {
            "cartId": 93,
            "productId": 94,
            "productName": "Nikon 2",
            "productDescription": "description",
            "price": 20,
            "productMake": 2020,
            "categoryId": 93,
            "categoryName": "Nikon",
            "catoryModel": 2018,
            "type": "Mirrorless"
        }
    ]
}

*      
* @apiVersion 1.0.0
**/

exports.getCart = async (req, res)  => {

    const langMsg = config.Msg[req.app.get("lang")];

    try {

        let input = req.body;



        let cart = await service.getCart(input);

        util.makeJsonResponse(res, true, httpStatusCode.OK, langMsg.success, cart);

        
    } catch (e) {
        console.log(e);
        
        util.makeJsonResponse(res, false,httpStatusCode.INTERNAL_SERVER_ERROR, langMsg.webError, []);
    }
}


/**
 * @api {get} /crownStackService/products/:categoryId get products by category
 * @apiName categoryProducts
 * @apiGroup products 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription get products by category
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
    "result": [
        {
            "productId": 95,
            "categoryId": 94,
            "name": "Canon 1",
            "description": "description",
            "price": 30,
            "make": 2019,
            "createdAt": "2020-04-26T19:40:25.000Z",
            "updatedAt": null
        },
        {
            "productId": 96,
            "categoryId": 94,
            "name": "Canon 2",
            "description": "description",
            "price": 40,
            "make": 2020,
            "createdAt": "2020-04-26T19:40:25.000Z",
            "updatedAt": null
        }
    ]
}

*      
* @apiVersion 1.0.0
**/
