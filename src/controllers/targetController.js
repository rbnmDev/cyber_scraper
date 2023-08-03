import Scraper from "../scraper/scraper.js";
import Parser from "../parser/parser.js";
import Producto from "../models/producto.js";
import dotenv from "dotenv"

dotenv.config()

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
        if(!process.env.TEST){
            this.saveData(query,cards);
        }
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
                console.log("producto",producto);
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


