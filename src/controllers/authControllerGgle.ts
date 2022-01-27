import { Request, Response, NextFunction } from 'express';

export const signupGoogle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
};

export const failedGoogleSignup = (req: Request, res: Response) => {
  res.send('something went wrong...');
};

export const protectedPage = (req: Request, res: Response) => {
  const user: any = req.user;

  res.send(`Hello ${user.displayName}`);
};

export const logout = (req: Request, res: Response) => {
  req.logOut();
  req.session.destroy(() => {});
  res.send('Goodbye');
};

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}
