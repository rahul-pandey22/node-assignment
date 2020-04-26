
const config = require('../config/config');
const utils = require('../util/customFunctions');
const util = new utils();
const path = require('path');
const httpStatusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const service = require("../services/services");



module.exports = {
    
    anonymousAuthorize: async (req, res, next) => {
        const langMsg = config.Msg[req.app.get("lang")];
        try {
            //-------------------------- START Check AnonymousAuthorize
            if (config.AnonymousReqSecret['Web'] === req.headers['client_secret']) {
                next();
            } else {
                
                util.makeJsonResponse(res, false, httpStatusCode.UNAUTHORIZED, util.formatException(langMsg.unauthorized, ''), {});
            }
            //-------------------------- END Check AnonymousAuthorize
        } catch (e) {
            
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, util.formatException(langMsg.webError, e.stack.toString()), {});

        }
    },
    cognitoAuthorize: async (req, res, next) => {

        const langMsg = config.Msg[req.app.get("lang")];

        try {
            /**
             * Authenticate user using cognito Jwt token auth mechanism 
             */
                    
            //-------------------------- START Check CognitoAuthorize
            if (!req.headers['authorization']) {
                
                util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.authError, {});
            } else {
                 // check header or url parameters or post parameters for token
                // con
                let token = req.headers['authorization'];
                // decode token

                if (token) {
                    // verifies secret and checks expf.
                
                    let secret = config.secret;

                    jwt.verify(token, secret, async (err, payload) => {
                        if (err) {
                            switch (err.name) {
                                case 'TokenExpiredError':
                                    
                                    util.makeJsonResponse(res, false, httpStatusCode.UNAUTHORIZED, langMsg.expireToken, {});
                                    break;
                                default:
                                    
                                    util.makeJsonResponse(res, false, httpStatusCode.UNAUTHORIZED, langMsg.invalidToken, {});
                                    break;
                            }
                            return;
                        } else {
                            
                            const userData = await service.checkValidUser(payload.userId);

                            if (userData) {

                                switch(userData) {

                                    case userData[0].isBlocked == '1':  // if blocked

                                        util.makeJsonResponse(res, true, httpStatusCode.FORBIDDEN, langMsg.userBlocked, {});
                                    
                                    case userData[0].isDeleted == '1':  // if deleted

                                        util.makeJsonResponse(res, true, httpStatusCode.FORBIDDEN, langMsg.userDeleted, {});                    
                                    
                                    default:
                    
                                        req.body['decodedUserId'] = payload.userId;
                                        return next();

                                }

                            } else {
                                util.makeJsonResponse(res, true, httpStatusCode.BAD_REQUEST, langMsg.userNotFound, {});
                            }
                        }
                    });
                } else {
                    
                    util.makeJsonResponse(res, false, httpStatusCode.BAD_REQUEST, langMsg.authError, {});
                }
            }
            //-------------------------- END Check CognitoAuthorize
        } catch (e) {
            
            util.makeJsonResponse(res, false, httpStatusCode.INTERNAL_SERVER_ERROR, util.formatException(langMsg.webError, e.stack.toString()), {});
        }
    }
}