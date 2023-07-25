import express from 'express';
import TargetController from './controllers/targetController.js';
const app = express();

app.get('/', async (req, res) => {
    const targetController = new TargetController();
    await targetController.init();
    //let query  = req.query.query;
    let query = "portatil"
    const content = await targetController.getData(query);
    res.send(content);
    }
);

app.listen(3003, () => {
    console.log('Example app listening on port 3003!');
    }
);