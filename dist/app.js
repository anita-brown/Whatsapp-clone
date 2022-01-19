"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./auth");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
// console.log(process.env, '*****');
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
/**KL
 * log request
 */
// app.use((req, res, next) => {
//   console.log(`url: ${req.url}, method: ${req.method}`);
//   next();
// });
app.get('/', (req, res, next) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log('google callback is working');
//     next();
//   },
app.get('/google/callback2', passport_1.default.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/failure',
}));
app.get('/auth/failure', (req, res) => {
    //   console.log('authentication failure');
    res.send('something went wrong...');
});
// app.get('/auth/protected', (req: Request, res: Response) => {
//   try {
//     console.log('protected says');
//     return res.json({
//       success: 'Hi this is protechjjhted.',
//     });
//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
// });
app.get('/auth/protected', isLoggedIn, (req, res) => {
    console.log(req.user);
    const user = req.user;
    res.send(`Hello ${user.displayName}`);
    // ${req.user?.displayName}
});
app.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy(() => {
        console.log('hi');
    });
    res.send('Goodbye');
});
// app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
//   res.status(500);
//   console.log(error);
//   res.json({
//     message: 'Error occurred.',
//     error: error,
//   });
// });
exports.default = app;
