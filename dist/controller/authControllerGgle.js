"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.logout = exports.protectedPage = exports.failedGoogleSignup = exports.signupGoogle = void 0;
const signupGoogle = (req, res, next) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
};
exports.signupGoogle = signupGoogle;
const failedGoogleSignup = (req, res) => {
    res.send('something went wrong...');
};
exports.failedGoogleSignup = failedGoogleSignup;
const protectedPage = (req, res) => {
    const user = req.user;
    res.send(`Hello ${user.displayName}`);
};
exports.protectedPage = protectedPage;
const logout = (req, res) => {
    req.logOut();
    req.session.destroy(() => { });
    res.send('Goodbye');
};
exports.logout = logout;
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
exports.isLoggedIn = isLoggedIn;
