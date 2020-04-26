'use strict';

module.exports = {
    APIResCode: {
        Success: 200,
        InvalidCredential: 203,
        BadRequest: 400,
        Unauthorized: 401,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        RequestTimeout: 408,
        Conflict: 409,
        LengthRequired: 411,
        InvalidToken: 498,
        TokenRequired: 499,
        ServerError: 500,
        ExpireToken: 401,
        InvalidAccessToken: 417,
        InvalidRefreshToken: 410
    },
    pageSize : 10,
    PolicyConst: {
        TermsAndConditions: 1,
        PrivacyPolicy: 2,
        ConsentPolicy: 3,
        AboutUs: 4
    },
    GenderConst: {
        Male: 1,
        Female: 2,
        Trans: 3
    },
    DevicePlateform: {
        Android: 1,
        IOS: 2,
        Web: 3,
        ApiServer: 4
    },
    Components: {
        Environment: 'environments',
        Object: 'objects'
    },
    rapAlertV : 45,
    rapQuestionAlertCount : 70,
    tokenType:{
        accessToken: 1,
        refreshToken: 2
    }
    
}
