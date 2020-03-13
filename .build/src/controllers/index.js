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
const got_1 = __importDefault(require("got"));
const controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = yield got_1.default("https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy", { responseType: "json" });
        res.status(200).send({ body });
    }
    catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error
        });
    }
});
exports.default = controller;
//# sourceMappingURL=index.js.map