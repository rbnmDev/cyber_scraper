import express from 'express';
import TargetController from './controllers/targetController.js';
const app = express();

app.get('/', async (req, res) => {
    const targetController = new TargetController();
    await TargetController.init();
    let query  = req.query.query;
    let pages = 4;
    const content = await TargetController.getData(query, pages);
    res.send(content);
    }
);

app.listen(3003, () => {
    console.log('Example app listening on port 3003!');
    }
);