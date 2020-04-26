module.exports = {
    signupSchema: function () {
        var schema = {
            type: 'object',
            properties: {
                firstName: { type: 'string'},
                lastName: { type: 'string'},
                emailAddress: { type: 'string', pattern: 'email' },
                countryId: { type: 'number'},
                cityId: { type: 'number'},
                password: { type: 'string'},
                phoneNumber: { type: 'string'},
                age: {type: 'number', optional: true},
                categoryIds: {type: 'array'},
                businessUrl: {type: 'string', optional: true},
                roleId: {type: 'number', eq: [2,3]}
            }
        };
        return schema;
    },    
    addUserBankSchema: function () {
        var schema = {
            type: 'object',
            properties: {
                country:{type: 'string', eq: ["US","CA"]},               
                firstName: { type: 'string' },               
                routingNo: { type: 'string', optional: true},
                accountNo: { type: 'string'}              
            }
        }; 
        return schema;
    },    
    topUpSchema: function () {
        var schema = {
            type: 'object',
            properties: {          
                amount: { type: 'number', gte: 100},
                userName:{type: 'string'},
                promocodeId:{type: 'number', optional: true}
            }
        }; 
        return schema;
    },    
    requestPayment: function () {
        var schema = {
            type: 'object',
            properties: {
                userStripeId:{type: 'string'},               
                amount: { type: 'number', gte: 5},
                userName:{type: 'string'}
            }
        }; 
        return schema;
    },    
    payout: function () {
        var schema = {
            type: 'object',
            properties: {
                paypalEmail:{type: 'string'},               
                amount: { type: 'number', gte: 5}
            }
        }; 
        return schema;
    },
    getUserTransaction: function () {
        var schema = {
            type: 'object',
            properties: {    
                pageNo:{type: 'int'}
            }
        }; 
        return schema;
    }
}