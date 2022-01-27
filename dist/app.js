"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const passport_ggle_1 = require("./passport/passport-ggle");
const authRouteGgle_1 = __importDefault(require("./routes/authRouteGgle"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const emailVerify_1 = __importDefault(require("./routes/emailVerify"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database/database");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, passport_ggle_1.setupGoogle)();
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', authRouteGgle_1.default);
// Cookie session middleware to help remember user sessions.
app.use((0, cookie_session_1.default)({
    // name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//MongoDB connection
if (process.env.NODE_ENV === 'test') {
    (0, database_1.mongoMockConnect)();
}
else {
    (0, database_1.mongoDBConnect)();
}
// Initialize passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', authRoute_1.default);
// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', userRoute_1.default);
//User auth routes
app.use('/api/v1/users', emailVerify_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({
        error: err.message,
    });
});
exports.default = app;
