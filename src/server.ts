import express, { Application, Request, Response, NextFunction } from 'express';
import app from './app';

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
