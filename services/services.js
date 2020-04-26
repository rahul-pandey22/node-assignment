/*
 * @Description: api services
 * @Author: Rahul pandey
 * @Date: 2020-04-26 18:53:51
 * @LastEditTime: 2020-04-26 17:17:59
 */


const model = require('../model/model.js');

module.exports = {
    login: async (input) => {
        try {
            const result = await model.login(input);
            if (result)
                return result;
        } catch (err) {

            throw err;
        }
    },
    insertToken: async (input) => {
        try {
            const result = await model.insertToken(input);
            if (result)
                return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    checkValidUser: async (input) => {
        try {
            const result = await model.checkValidUser(input);
            if (result)
                return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    categoies: async (input) => {
        try {
            const result = await model.categoies(input);
            if (result)
                return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    products: async (categoryId) => {
        try {
            const result = await model.products(categoryId);
            if (result)
                return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    cart: async (input) => {
        try {
            const result = await model.cart(input);
            if (result)
                return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    getCart: async (input) => {
        try {
            const result = await model.getCart(input);
            if (result)
                return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
 

}