import express from 'express';
import Connection from './database/db.js';
import dotenv from'dotenv'
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use('/',Router);

app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`))

const mongo_url = process.env.MONGODB_URL;

Connection(mongo_url);