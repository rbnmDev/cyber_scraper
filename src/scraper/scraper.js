import puppeteer from "puppeteer";

class Scraper {
    constructor(headless = false) {
        this.browser = null;
        this.page = null;
        this.headless = headless;
        //this.baseURL = new URL("https://www.macnificos.com/");
    }

    init = async () => {
        this.browser = await puppeteer.launch({
            headless: this.headless,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        this.page = await this.browser.newPage();
    }

    close = async () => {
        await this.browser.close();
    }

    scrollAndClickMoreProducts = async (selectorBotonVerMas, tiempoEspera) => {
        while (await this.page.$(selectorBotonVerMas)) {
            const alturaAntesScroll = await this.page.evaluate(() => document.body.scrollHeight);
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await new Promise(r => setTimeout(r, tiempoEspera));
            await this.page.click(selectorBotonVerMas);
            await new Promise(r => setTimeout(r, tiempoEspera));
            const alturaDespuesScroll = await this.page.evaluate(() => document.body.scrollHeight);
            if (alturaAntesScroll === alturaDespuesScroll) {
                break;
            }
        }
    }

    scrap = async (query) => {
        try {

            this.baseURL = new URL(`https://www.macnificos.com/search/${query}`);
            const url = this.baseURL.toString();

            await this.page.goto(url);

            const selectorBotonVerMas = "#facets_pager";
            const tiempoEspera = 1000;

            await this.scrollAndClickMoreProducts(selectorBotonVerMas, tiempoEspera);

            const content = await this.page.content();
            return content;

        } catch (e) {
            return [];
        }
    }

    

}

export default Scraper;