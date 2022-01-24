import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.route('/').get((req: Request, res: Response) => {
  res.send('Hello world');
});
module.exports = router;
