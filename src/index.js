import express from 'express';
import TargetController from './controllers/targetController.js';
const app = express();


app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('src/public'));

app.get('/', async (req, res) => {
    let query = req.query.query;
    if (!query) {
        res.render("index", { data: [] });
        return
    }
    const targetController = new TargetController();
    await targetController.init();
    const content = await targetController.getData(query);
    res.render("index", { data: content });

    //res.send(content); //Devuelve en JSON - REACT!!!!
}
);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);