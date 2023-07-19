import Scraper from "../scraper/scraper.js";
import Parser from "../parser/parser.js";

class AmazonController{
    constructor (){
        this.scraper = new Scraper();
        this.parser = null;
    }

    init = async () => {
        await this.scraper.init();
    }

    getData = async (query, pages) => {
        const content = await this.scraper.multiScrap(query, pages);
        this.parser = new Parser(content);
        const cards = this.parser.getCardsArray();
        return cards;
    }
}

export default AmazonController;