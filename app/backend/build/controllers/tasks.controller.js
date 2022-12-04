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
const statusCodes_1 = __importDefault(require("../statusCodes"));
const tasks_service_1 = __importDefault(require("../services/tasks.service"));
class TaskControler {
    constructor(taskServices = new tasks_service_1.default()) {
        this.taskServices = taskServices;
        this.getTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const tasks = yield this.taskServices.findAllTasks(userId);
            res.status(statusCodes_1.default.OK).json(tasks);
        });
        this.getTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const taskId = Number(req.params.taskId);
            const tasks = yield this.taskServices.findOneTask(userId, taskId);
            res.status(statusCodes_1.default.OK).json(tasks);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const tasksData = req.body;
            yield this.taskServices.create(Object.assign({ userId }, tasksData));
            res.status(statusCodes_1.default.CREATED).json({ message: "Tarefa criada com sucesso!" });
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const taskId = Number(req.params.taskId);
            const tasksData = req.body;
            yield this.taskServices.update(userId, taskId, Object.assign({ userId }, tasksData));
            res.status(statusCodes_1.default.NO_CONTENT).end();
        });
        this.remove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const taskId = Number(req.params.taskId);
            yield this.taskServices.remove(userId, taskId);
            res.status(statusCodes_1.default.NO_CONTENT).end();
        });
    }
}
exports.default = TaskControler;
;
