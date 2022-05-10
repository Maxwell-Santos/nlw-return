import { routes } from './routes';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes) //importando as rotas


app.listen(3333, ()=>{ 
  console.log('server is runing!!');
})