import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//app Config
const app = express();
const port = process.env.PORT || 4000;

//Middlewares
app.use(express.json());
app.use(cors());

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('Api is running');
});

//Listener
app.listen(port, () => console.log(`Server is running on port ${port}`));