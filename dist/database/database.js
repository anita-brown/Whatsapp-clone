"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoMockConnect = exports.mongoDBConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoDBConnect = () => {
    var _a;
    try {
        const DB = (_a = process.env.MONGO_URL) === null || _a === void 0 ? void 0 : _a.replace('<PASSWORD>', process.env.MONGO_PASS);
        mongoose_1.default
            .connect(DB)
            .then(() => {
            console.log(`DB connection successful....`);
        })
            .catch((err) => {
            console.log(`DB connection error: ${err}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mongoDBConnect = mongoDBConnect;
const mongoMockConnect = () => {
    try {
        mongodb_memory_server_1.MongoMemoryServer.create().then((mongo) => {
            const uri = mongo.getUri();
            mongoose_1.default.connect(uri).then(() => {
                console.log(`Mock DB connected...`);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mongoMockConnect = mongoMockConnect;
