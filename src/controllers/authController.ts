import { Request, Response, NextFunction } from 'express';

export const signupGoogle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
};

export const failedGoogleSignup = (req: Request, res: Response) => {
  //   console.log('authentication failure');
  res.send('something went wrong...');
};

export const protectedPage = (req: Request, res: Response) => {
  console.log(req.user);
  const user: any = req.user;

  res.send(`Hello ${user.displayName}`);
  // ${req.user?.displayName}
};

export const logout = (req: Request, res: Response) => {
  req.logOut();
  req.session.destroy(() => {
    console.log('hi');
  });
  res.send('Goodbye');
};

// console.log(process.env, '*****');
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    req.user ? next() : res.sendStatus(401);
  }