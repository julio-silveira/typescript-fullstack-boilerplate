"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const LOGIN_ROUTE = '/users';
const CREATE_USER_ROUTE = '/users/create';
const router = (0, express_1.Router)();
const usersController = new users_controller_1.default();
router.post(LOGIN_ROUTE, usersController.userLogin);
router.post(CREATE_USER_ROUTE, usersController.createUser);
exports.default = router;
