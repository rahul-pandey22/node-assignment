define({ "api": [
  {
    "type": "post",
    "url": "/crownStackService/cart",
    "title": "insert into cart",
    "name": "cart",
    "group": "cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>insert into cart</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>product id to insert</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Successfully added\",\n    \"result\": [\n        {\n            \"checkId\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/controller.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "/crownStackService/cart",
    "title": "get cart",
    "name": "getCart",
    "group": "cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get cart</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Success\",\n    \"result\": [\n        {\n            \"cartId\": 93,\n            \"productId\": 94,\n            \"productName\": \"Nikon 2\",\n            \"productDescription\": \"description\",\n            \"price\": 20,\n            \"productMake\": 2020,\n            \"categoryId\": 93,\n            \"categoryName\": \"Nikon\",\n            \"catoryModel\": 2018,\n            \"type\": \"Mirrorless\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/controller.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "/crownStackService/categoies",
    "title": "get category master",
    "name": "categoies",
    "group": "category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get category master</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Success\",\n    \"result\": [\n        {\n            \"categoryId\": 93,\n            \"name\": \"Nikon\",\n            \"model\": 2018,\n            \"type\": \"Mirrorless\",\n            \"createdAt\": \"2020-04-26T17:13:19.000Z\",\n            \"updatedAt\": null\n        },\n        {\n            \"categoryId\": 94,\n            \"name\": \"Canon\",\n            \"model\": 2019,\n            \"type\": \"Mirrorless\",\n            \"createdAt\": \"2020-04-26T17:13:19.000Z\",\n            \"updatedAt\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/controller.js",
    "groupTitle": "category"
  },
  {
    "type": "post",
    "url": "/payment/addUserBank",
    "title": "addUserBank",
    "name": "addUserBank",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>add End-User Bank</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>(can be &quot;US&quot; or &quot;CA&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "routingNo",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ssn",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"success\",\n    \"result\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "put",
    "url": "/payment/deleteBank",
    "title": "",
    "name": "deleteBank",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>delete bank of logged in user</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Record updated successfully\",\n    \"result\": {\n        \"id\": \"ba_1Epw4HCRA9DYX9ZjfyEYhV3u\",\n        \"object\": \"bank_account\",\n        \"account\": \"acct_1Epw4ECRA9DYX9Zj\",\n        \"account_holder_name\": \"Rahul\",\n        \"account_holder_type\": null,\n        \"bank_name\": \"STRIPE TEST BANK\",\n        \"country\": \"US\",\n        \"currency\": \"usd\",\n        \"default_for_currency\": true,\n        \"fingerprint\": \"3tFGWIyTKRgMtv3q\",\n        \"last4\": \"1113\",\n        \"metadata\": {},\n        \"routing_number\": \"110000000\",\n        \"status\": \"new\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "get",
    "url": "/payment/getBank",
    "title": "",
    "name": "getBank",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get logged in user bank</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Record updated successfully\",\n    \"result\": {\n        \"id\": \"ba_1Epw4HCRA9DYX9ZjfyEYhV3u\",\n        \"object\": \"bank_account\",\n        \"account\": \"acct_1Epw4ECRA9DYX9Zj\",\n        \"account_holder_name\": \"Rahul\",\n        \"account_holder_type\": null,\n        \"bank_name\": \"STRIPE TEST BANK\",\n        \"country\": \"US\",\n        \"currency\": \"usd\",\n        \"default_for_currency\": true,\n        \"fingerprint\": \"3tFGWIyTKRgMtv3q\",\n        \"last4\": \"1113\",\n        \"metadata\": {},\n        \"routing_number\": \"110000000\",\n        \"status\": \"new\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "get",
    "url": "/payment/getUserTransaction",
    "title": "getUserTransaction",
    "name": "getUserTransaction",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get logged in user Transactions</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "pageNo",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"success\",\n    \"result\": {\n        \"list\": [\n            {\n                \"transactionHistoryId\": 2,\n                \"transactionId\": \"PAYID-LVXG3AA3NX83801JR4270415\",\n                \"transactionAt\": \"2019-09-03T13:41:19Z\",\n                \"transferAmount\": 100,\n                \"createdAt\": \"2019-09-03T13:41:20.000Z\",\n                \"totalCount\": 2\n            },\n            {\n                \"transactionHistoryId\": 1,\n                \"transactionId\": \"PAYID-LVXG2RQ708504294H7085233\",\n                \"transactionAt\": \"2019-09-03T13:40:22Z\",\n                \"transferAmount\": 100,\n                \"createdAt\": \"2019-09-03T13:40:22.000Z\",\n                \"totalCount\": 2\n            }\n        ],\n        \"totalCount\": 2\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "post",
    "url": "/payment/payout",
    "title": "payout",
    "name": "payout",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>payout to paypal users</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "paypalEmail",
            "description": "<p>(payPal registered email)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>(amount to transfer)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Record updated successfully\",\n    \"result\": {\n        \n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "post",
    "url": "/payment/requestPayment",
    "title": "requestPayment",
    "name": "requestPayment",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>payment request by end-user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userStripeId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>transaction amount</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>user name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Success\",\n    \"result\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "post",
    "url": "/payment/success",
    "title": "payout success",
    "name": "success",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>paypal business user TopUp success</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "PayerID",
            "description": "<p>(payPal PayerID)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "paymentId",
            "description": "<p>(paymentId)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Record updated successfully\",\n    \"result\": {\n        \n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "post",
    "url": "/payment/topUp",
    "title": "topUp",
    "name": "topUp",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>business user topUp</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>transaction amount</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "promocodeId",
            "description": "<p>promocode id</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>total amount</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Success\",\n    \"result\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "get",
    "url": "/payment/validatePromocode",
    "title": "validatePromocode",
    "name": "validatePromocode",
    "group": "payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get detail of email</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "promocodeId",
            "description": "<p>(promo code)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Success\",\n    \"result\": {\n        \"discount\": 10\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/paymentController.js",
    "groupTitle": "payment"
  },
  {
    "type": "get",
    "url": "/crownStackService/products/:categoryId",
    "title": "get products by category",
    "name": "categoryProducts",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get products by category</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Success\",\n    \"result\": [\n        {\n            \"productId\": 95,\n            \"categoryId\": 94,\n            \"name\": \"Canon 1\",\n            \"description\": \"description\",\n            \"price\": 30,\n            \"make\": 2019,\n            \"createdAt\": \"2020-04-26T19:40:25.000Z\",\n            \"updatedAt\": null\n        },\n        {\n            \"productId\": 96,\n            \"categoryId\": 94,\n            \"name\": \"Canon 2\",\n            \"description\": \"description\",\n            \"price\": 40,\n            \"make\": 2020,\n            \"createdAt\": \"2020-04-26T19:40:25.000Z\",\n            \"updatedAt\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/controller.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/crownStackService/products",
    "title": "get products master",
    "name": "products",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get products master</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Success\",\n    \"result\": [\n        {\n            \"productId\": 93,\n            \"categoryId\": 93,\n            \"name\": \"Nikon 1\",\n            \"description\": \"description\",\n            \"price\": 10,\n            \"make\": 2019,\n            \"createdAt\": \"2020-04-26T19:40:25.000Z\",\n            \"updatedAt\": null\n        },\n        {\n            \"productId\": 94,\n            \"categoryId\": 93,\n            \"name\": \"Nikon 2\",\n            \"description\": \"description\",\n            \"price\": 20,\n            \"make\": 2020,\n            \"createdAt\": \"2020-04-26T19:40:25.000Z\",\n            \"updatedAt\": null\n        },\n        {\n            \"productId\": 95,\n            \"categoryId\": 94,\n            \"name\": \"Canon 1\",\n            \"description\": \"description\",\n            \"price\": 30,\n            \"make\": 2019,\n            \"createdAt\": \"2020-04-26T19:40:25.000Z\",\n            \"updatedAt\": null\n        },\n        {\n            \"productId\": 96,\n            \"categoryId\": 94,\n            \"name\": \"Canon 2\",\n            \"description\": \"description\",\n            \"price\": 40,\n            \"make\": 2020,\n            \"createdAt\": \"2020-04-26T19:40:25.000Z\",\n            \"updatedAt\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/controller.js",
    "groupTitle": "products"
  },
  {
    "type": "post",
    "url": "/crownStackService/login",
    "title": "login-user",
    "name": "login",
    "group": "userService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>User login</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailAddress",
            "description": "<p>User's email id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's account password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n    {\n    \"status\": true,\n    \"statusCode\": 200,\n    \"message\": \"Login successfully\",\n    \"result\": {\n        \"userId\": 93,\n        \"password\": \"2d6d01839f87ad1d28a8d61198a97b8d\",\n        \"firstName\": \"rahul\",\n        \"lastName\": \"pandey\",\n        \"emailAddress\": \"rahul.22@yopmail.com\",\n        \"isDeleted\": \"0\",\n        \"isBlocked\": \"0\",\n        \"blockedBy\": \"0\",\n        \"blockedAt\": null,\n        \"offset\": null,\n        \"createdAt\": \"2020-04-26T13:53:32.000Z\",\n        \"updatedAt\": \"2020-04-26T16:15:27.000Z\",\n        \"checkStatus\": 3,\n        \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkzLCJpYXQiOjE1ODc5MjAxMTUsImV4cCI6MTU4ODAwNjUxNX0.ei_UuE8zmP_TtlcXcTkFGezHZBUTnTEmT2mlOWuEU4c\",\n        \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkzLCJpYXQiOjE1ODc5MjAxMTUsImV4cCI6MTU4OTIxNjExNX0.0VL2WJAhSZdei5LjC09ath__rXURpcmJtSXj8cliQRA\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/controller.js",
    "groupTitle": "userService"
  }
] });
