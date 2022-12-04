"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = __importDefault(require("../controllers/tasks.controller"));
const validateJWT_1 = __importDefault(require("../auth/validateJWT"));
const ALL_TASKS_ROUTE = '/users/:userId/tasks';
const ONE_TASK_ROUTE = '/users/:userId/tasks/:taskId';
const router = (0, express_1.Router)();
const validateJWT = new validateJWT_1.default();
const taskController = new tasks_controller_1.default();
router.get(ALL_TASKS_ROUTE, validateJWT.tokenAuth, taskController.getTasks);
router.get(ONE_TASK_ROUTE, validateJWT.tokenAuth, taskController.getTask);
router.post(ALL_TASKS_ROUTE, validateJWT.tokenAuth, taskController.create);
router.put(ONE_TASK_ROUTE, validateJWT.tokenAuth, taskController.update);
router.delete(ONE_TASK_ROUTE, validateJWT.tokenAuth, taskController.remove);
exports.default = router;
