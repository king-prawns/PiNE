import express from 'express';

const sendResponse = (_req: express.Request, res: express.Response): void => {
  const data: any = res.locals.data;

  data.pipe(res);
};

export default sendResponse;
