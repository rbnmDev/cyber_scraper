import Scraper from "../scraper/scraper.js";
import Parser from "../parser/parser.js";
import Producto from "../models/producto.js";


class TargetController{
    constructor (){
        this.scraper = new Scraper();
        this.parser = null;
    }

    init = async () => {
        await this.scraper.init();
    }

    getData = async (query) => {
        const content = await this.scraper.scrap(query);
        this.parser = new Parser(content);
        const cards = this.parser.getCardsArray();
        this.saveData(query,cards);
        this.close();
        return cards;
    }

    saveData = async (query,cards) => {
        for(let card of cards){
            try{
                card.shop = "https://www.macnificos.com/"; 
                card.query = query; 
                const producto = new Producto(card);
                await producto.save();
            }
            catch(e){
                console.log(e);
            }
        }
    }
  
    close = async () => {
        await this.scraper.close();
    }
}

export default TargetController;







/* import Scraper from "../scraper/scraper.js";
import Parser from "../parser/parser.js";

class TargetController {
    constructor() {
        this.scraper = new Scraper();
        this.parser = null;
    }

    init = async () => {
        await this.scraper.init();
    }

    getData = async (query) => {
        const content = await this.scraper.scrap(query);
        this.parser = new Parser(content);
        const targetHTML = this.parser.getHtml();
        //const cards = this.parser.getCardsArray();
        this.saveData(targetHTML);
        this.close();
        return targetHTML;
    }

    saveData = async (targetHTML) => {
        try {

            await targetHTML.save();

        } catch (e) {
            console.log(e);
        }
    }


    close = async () => {
        await this.scraper.close();
    }
}

export default TargetController; */