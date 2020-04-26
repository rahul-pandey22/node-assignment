var promise = require('promise'),
	config = require('../config/config');
const jwt = require('jsonwebtoken');
var moment = require('moment-timezone');
moment.tz.setDefault("Etc/Universal");
var crypto = require('crypto');
var constant = require('../config/appConstants');

function encryptionHelper() {

}

encryptionHelper.prototype.jwtToken = function (id,type) {
	try {	
		
		var token = jwt.sign({'userId': id},type === constant.tokenType.accessToken ? config.secret : config.refreshSecret, {
            expiresIn: type === constant.tokenType.accessToken ? 86400 : 86400*15 // expires in 24 hours for acess token and 15 days for refresh token
		});	
	//	console.log(token);	
		return(token);
	} catch (e) {
		console.log(e);
		return(false);
	}
}

encryptionHelper.prototype.aesEncript = function (planText) {
	try {		
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		let iv = new Buffer(config.AesSecretIVKey);
		let key = new Buffer(config.AesSecretKey);	
		let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(planText, 'utf8', 'hex') + cipher.final('hex');
		return encryptedData;
	} catch (e) {
		console.log(e);
		return '';
	}
}
encryptionHelper.prototype.aesDecript = function (encryptedText) {
	try {
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		let iv = new Buffer(config.AesSecretIVKey);
		let key = new Buffer(config.AesSecretKey);		
		let cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(encryptedText, 'hex', 'utf8') + cipher.final('utf8');
		return encryptedData;
	} catch (e) {
		return '';
	}
}
encryptionHelper.prototype.tokenDecode = function (Token) {
	return new promise(function (resolve, reject) {
		try {
			var decodedJwt = jwt.decode(Token, { complete: true });
			resolve(decodedJwt);
		} catch (e) {
			reject(false);
		}
	});
}
encryptionHelper.prototype.tokenVerify = function (Token,type) {
	return new promise(function (resolve, reject) {
		try {
			jwt.verify(Token, type === constant.tokenType.accessToken ? config.secret : config.refreshSecret, function (err, decoded) {
				if(err)
				{
					reject(err);
				}
				else
				{
					resolve(decoded);
				}
		});
		} catch (e) {
			reject(false);
		}
	});
}


encryptionHelper.prototype.verifyJwtRefreshToken = function (Token,type) {
	return new promise(function (resolve, reject) {
		try {
			jwt.verify(Token, type === constant.tokenType.accessToken ? config.secret : config.refreshSecret, function (err, decoded) {
				if(err)
				{
					reject(err);
				}
				else
				{
					resolve(decoded);
				}
		});
		} catch (e) {
			reject(false);
		}
	});
}

module.exports = encryptionHelper;
