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
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
const restify_errors_1 = require("restify-errors");
const properties = ['username', 'passwordHash',];
class UserService {
    constructor() {
        this.usersModel = UserModel_1.default;
    }
    static validateProperties(user) {
        for (let i = 0; i < properties.length; i += 1) {
            if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
                return [false, properties[i]];
            }
        }
        return [true, null];
    }
    static validateValues(user) {
        const entries = Object.entries(user);
        for (let i = 0; i < entries.length; i += 1) {
            const [property, value] = entries[i];
            if (!value) {
                return [false, property];
            }
        }
        return [true, null];
    }
    static validationUser(user) {
        let [valid, property] = UserService.validateProperties(user);
        if (!valid) {
            return `O campo ${property} é obrigatório.`;
        }
        [valid, property] = UserService.validateValues(user);
        if (!valid) {
            return `O campo ${property} não pode ser nulo ou vazio.`;
        }
    }
    getUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.findOne({ where: { username }, raw: true });
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.findOne({ where: { id }, raw: true });
            return user;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidUser = UserService.validationUser(userData);
            if (typeof isValidUser === 'string')
                throw new restify_errors_1.BadRequestError(isValidUser);
            const newUser = yield this.usersModel.create(Object.assign({}, userData));
            return newUser;
        });
    }
}
exports.default = UserService;
