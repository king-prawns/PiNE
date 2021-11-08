import hello from './hello';
import express from 'express';

const app = express();
app.listen(5000, () => {
  hello();
});

app.get('/url', (_req, res, _next) => {
  res.json(['hello', 'world']);
});

app.get('/lru', (_req, res, _next) => {
  res.json(['dlrow', 'olleh']);
});
