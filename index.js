import express from 'express'  
import cors from "cors"
import bodyParser from "body-parser";

import connectDB from './dataBase.js';
import LinksRouter from './routers/linksRouter.js';
import UsersRouter from './routers/usersRouter.js';
import LinksController from './controllers/linksController.js';

connectDB();
const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = 5000

app.use('/users',UsersRouter);
app.use('/links',LinksRouter)
app.use('/:id',LinksController.redirectLink)


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
