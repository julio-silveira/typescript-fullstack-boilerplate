"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaskModel_1 = __importDefault(require("../database/models/TaskModel"));
const restify_errors_1 = require("restify-errors");
const properties = ['userId', 'title', 'description'];
class TaskServices {
    constructor() {
        this.tasksModel = TaskModel_1.default;
    }
    static validateProperties(task) {
        for (let i = 0; i < properties.length; i += 1) {
            if (!Object.prototype.hasOwnProperty.call(task, properties[i])) {
                return [false, properties[i]];
            }
        }
        return [true, null];
    }
    static validateValues(task) {
        const entries = Object.entries(task);
        for (let i = 0; i < entries.length; i += 1) {
            const [property, value] = entries[i];
            if (!value) {
                return [false, property];
            }
        }
        return [true, null];
    }
    static validationTask(task) {
        let [valid, property] = TaskServices.validateProperties(task);
        if (!valid) {
            return `O campo ${property} é obrigatório.`;
        }
        [valid, property] = TaskServices.validateValues(task);
        if (!valid) {
            return `O campo ${property} não pode ser nulo ou vazio.`;
        }
    }
    findAllTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.tasksModel.findAll({ where: { userId }, raw: true });
            return tasks;
        });
    }
    findOneTask(userId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.tasksModel.findOne({ where: { userId, id: taskId }, raw: true });
            if (task === null)
                throw new restify_errors_1.NotFoundError("Task not found!");
            return task;
        });
    }
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidTask = TaskServices.validationTask(task);
            if (typeof isValidTask === 'string')
                throw new restify_errors_1.BadRequestError(isValidTask);
            const newTask = this.tasksModel.create(Object.assign({}, task));
            return newTask;
        });
    }
    update(userId, taskId, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidTask = TaskServices.validationTask(task);
            if (typeof isValidTask === 'string')
                throw new restify_errors_1.BadRequestError(isValidTask);
            const { id } = yield this.findOneTask(userId, taskId);
            this.tasksModel.update(Object.assign({}, task), { where: { id } });
        });
    }
    remove(userId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = yield this.findOneTask(userId, taskId);
            this.tasksModel.destroy({ where: { id } });
        });
    }
}
exports.default = TaskServices;
