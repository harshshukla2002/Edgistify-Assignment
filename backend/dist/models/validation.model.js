"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidator = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .required(),
});
exports.loginValidator = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .required(),
});
