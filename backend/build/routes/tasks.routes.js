"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = __importDefault(require("../controllers/tasks.controller"));
const router = (0, express_1.Router)();
const taskController = new tasks_controller_1.default();
router.get('/users/:userId/tasks', taskController.getTasks);
router.get('/users/:userId/tasks/:taskId', taskController.getTask);
router.post('/users/:userId/tasks', taskController.create);
router.put('/users/:userId/tasks/:taskId', taskController.update);
router.delete('/users/:userId/tasks/:taskId', taskController.remove);
exports.default = router;
