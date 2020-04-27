module.exports = {
        
    loginSchema: function () {
        let schema = {
            type: 'object',
            properties: {               
                emailAddress: { type: 'string', pattern: 'email'},               
                password: { type: 'string', optional: true},           
            }
        }; 
        return schema;
    },
    cartSchema: function () {
        let schema = {
            type: 'object',
            properties: {
                decodedUserId: { type: 'number', lte: 2147483648},
                productId: { type: 'number', lte: 2147483648}
            }
        };
        return schema;
    }
}