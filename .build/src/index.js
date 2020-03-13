"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use('/', routes_1.default);
exports.default = serverless_http_1.default(app);
//# sourceMappingURL=index.js.map