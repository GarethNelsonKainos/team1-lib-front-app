import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import homeRouter from './routes/home.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const appViews = path.join(__dirname, 'views');

const app = express();

const nunjucksConfig = {
  autoescape: true,
  noCache: true,
  express: app,
};

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

const nunjucksEnv = nunjucks.configure(
  [appViews, path.join(projectRoot, 'node_modules/govuk-frontend/dist')],
  nunjucksConfig
);
nunjucksEnv.addGlobal('govukRebrand', true);

app.use('/', homeRouter);

app.use('/govuk', express.static(
  path.join(projectRoot, 'node_modules/govuk-frontend/dist/govuk')
));

app.use('/assets', express.static(
  path.join(projectRoot, 'node_modules/govuk-frontend/dist/govuk/assets')
));

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});