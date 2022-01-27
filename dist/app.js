"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_ggle_1 = require("./passport/passport-ggle");
const authRouteGgle_1 = __importDefault(require("./routes/authRouteGgle"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, passport_ggle_1.setupGoogle)();
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', authRouteGgle_1.default);
exports.default = app;
