const promise = require('promise'),
	each = require('sync-each');
const moment = require('moment-timezone');
moment.tz.setDefault("Etc/Universal");
const voucher_codes = require('voucher-code-generator');
const randtoken = require('rand-token');

function customFunction() {
}

customFunction.prototype.randomString = function () {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 9; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

customFunction.prototype.generatePassword = function (passwordLength) {
	let numberChars = "0123456789";
	let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let lowerChars = "!@#$%^&*()";
	//'!','@','#','$','%','^','&','*','(',')'
	let allChars = numberChars + upperChars + lowerChars;
	let randPasswordArray = Array(passwordLength);
	randPasswordArray[0] = numberChars;
	randPasswordArray[1] = upperChars;
	randPasswordArray[2] = lowerChars;
	randPasswordArray = randPasswordArray.fill(allChars, 3);
	return shuffleArray(randPasswordArray.map(function (x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}

shuffleArray = function (array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

customFunction.prototype.getLowerCase = function (text) {
	let Ltext = "";
	let Ltext = text.toLowerCase();
	return Ltext;
}

customFunction.prototype.replaceArrayOfString = function (string, find, replace) {
	let replaceString = string;
	let regex;
	return new promise(function (resolve, reject) {
		if (find.length > 0 && replace.length > 0 && string != "") {

			each(find, function (item, next) {
				let indexof = find.indexOf(item);
				regex = new RegExp(item, "g");
				replaceString = replaceString.replace(regex, replace[indexof]);
				next(null, item);
			}, function (err, transformed) {
				resolve(replaceString);
			});
		} else {
			resolve(replaceString);
		}
	});
};

customFunction.prototype.getRandomInteger = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

customFunction.prototype.randomString = function () {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 9; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

customFunction.prototype.replaceArrayOfString = function (MatchString, Find, Replace) {
	let ReplaceString = MatchString;
	let Regex;
	return new promise(function (resolve, reject) {
		if (Find.length > 0 && Replace.length > 0 && MatchString != "") {

			each(find, function (Item, Next) {
				let IndexOf = Find.indexOf(item);
				Regex = new RegExp(Item, "g");
				ReplaceString = ReplaceString.replace(Regex, Replace[IndexOf]);
				Next(null, Item);
			}, function (Err, Transformed) {
				resolve(ReplaceString);
			});
		} else {
			resolve(ReplaceString);
		}
	});
};

customFunction.prototype.getRandomInteger = function (Min, Max) {
	Min = Math.ceil(Min);
	Max = Math.floor(Max);
	return Math.floor(Math.random() * (Max - Min)) + Min;
}

customFunction.prototype.getUnixTime = function () {
	return moment().unix();
};

customFunction.prototype.covertUnixTimeStamp = function (current_date) {
	return moment(current_date).unix();
};

customFunction.prototype.getCurrentUtcTimeStamp = function () {
	return moment().format("YYYY-MM-DD H:mm:ss a");

};

customFunction.prototype.getCurrentUtcDate = function () {
	return moment().format("YYYY-MM-DD");

};

customFunction.prototype.getCurrentUtcEndDate = function () {
	return moment().add(23, 'hours').add(59, 'minutes').format("YYYY-MM-DD H:mm:ss");
};

customFunction.prototype.getUtcEndDate = function (EndDate) {

	return moment(EndDate).add(23, 'hours').add(59, 'minutes').format("YYYY-MM-DD H:mm:ss");

};

customFunction.prototype.getPreviousStartDate = function (PreviousRange) {

	return moment().add(-PreviousRange, 'days').format("YYYY-MM-DD");

};

customFunction.prototype.convertUtcDate = function (InputDate) {
	return moment(InputDate).format("YYYY-MM-DD");
};

customFunction.prototype.convertInt = function (value) {
	try {
		if (typeof (value) == "number") {
			return Number(value);
		} else {
			value = value ? value : '';
			value = value.replace(/[^0-9]/g, '');
			return isNaN(Number(value)) ? 0 : Number(value);
		}
	} catch (e) {
		return '';
	}
};

customFunction.prototype.convertBool = function (value) {
	let res = false;
	try {
		value = value ? value : false;
		if (typeof (value) == "number") {
			value = Number(value);
		} else if (typeof (value) == "boolean") {
			//value = (value);
		} else if (typeof (value) == "string") {
			value = (value).toString();
		} else {
			value = (value ? value : "").toString();
			value = value.replace(/[^0-9]/g, '');
			value = isNaN(Number(value)) ? 0 : Number(value);
		}
		switch (value) {
			case 1: res = true;
				break;
			case 0: res = false;
				break;
			case "false": res = false;
				break;
			case "true": res = true;
				break;
			case 'false': res = false;
				break;
			case 'true': res = true;
				break;
			case false: res = false;
				break;
			case true: res = true;
				break;
		}
		return res;
	} catch (e) {
		return res;
	}
};

customFunction.prototype.makeJsonResponse = function (res, successStatus, statusCode, message, result) {
	res.status(statusCode).json({
		"status": successStatus,
		"statusCode": statusCode,
		"message": message,
		"result": result ? result : {}
	});
};

customFunction.prototype.checkNull = function (Input) {
	return (Input == null) ? "" : Input;
}

customFunction.prototype.newVoucherCode = function (prefix, length) {
	try {
		length = Number(length);
		length = isNaN(length) ? 6 : length;
		let newCode = voucher_codes.generate(
			prefix ? {
				prefix: prefix,
				length: length ? length : 6,
				count: 1
			} : {
					length: 8,
					count: 1
				}
		);
		return newCode[0] ? newCode[0] : '';
	} catch (e) {
		return '';
	}
}

customFunction.prototype.customTrim = function (x) {
	try {
		return x.replace(/^\s+|\s+$/gm, '');
	} catch (e) {
		return '';
	}
}

customFunction.prototype.randomUId = function (imageName) {
	try {
		let uids = randtoken.uid(12);
		return imageName ? customTrim(imageName) + uids : uids;
	} catch (e) {
		return null;
	}
}

customFunction.prototype.formatException = function (Error, Exception) {
	try {
		Error = Error ? Error : '';
		Exception = (Exception && Exception.stack) ? Exception.stack : Exception;
		Error = typeof (Error) == "string" ? Error : JSON.stringify(Error ? Error : '');
		Exception = Exception && Exception != "" ? (JSON.stringify(Exception ? Exception : '')) : "";
		if (Exception) {
			return Error + (Exception && Exception != "" ? "-" : "") + (Exception && Exception != "" ? Exception : "");
		} else {
			return Error;
		}

	} catch (e) {
		return Error ? Error : "";
	}
},

	module.exports = customFunction;