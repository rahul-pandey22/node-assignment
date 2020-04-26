"use strict";

const express = require("express"),
  router = express.Router(),
  authMiddleware = require("../middleware/authMiddleware");

// Require controller modules.
const controller = require("../controllers/controller");



router.post("/login", authMiddleware.anonymousAuthorize, controller.login);
router.get("/categoies", authMiddleware.anonymousAuthorize, controller.categoies);
router.get("/products", authMiddleware.anonymousAuthorize, controller.products);
router.get("/products/:categoryId", authMiddleware.anonymousAuthorize, controller.products);
router.post("/cart", authMiddleware.cognitoAuthorize, controller.cart);
router.get("/cart", authMiddleware.cognitoAuthorize, controller.getCart);


module.exports = router;
