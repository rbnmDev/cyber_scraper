import { JSDOM } from 'jsdom';

class Parser {
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(this.html);
    }

    getCards = () => {
        return this.dom.window.document.querySelectorAll(".grid-item");
    }
    getTitle = (card) => {
        return card.querySelector(".views-field-title").textContent.trim();
    }
    getPrice = (card) => {
        return card.querySelector('div.product-price meta[itemprop="price"]').getAttribute('content') + "€";
    }
    getImage = (card) => {
        return "https://www.macnificos.com/" + card.querySelector(".field-image img").getAttribute("src");
    }
    getUrl = (card) => {
        return "https://www.macnificos.com" + card.querySelector(".wrapper-link").getAttribute("href");
    }


    getCard = (card) => {
        return {
            title: this.getTitle(card),
            price: this.getPrice(card),
            image: this.getImage(card),
            url: this.getUrl(card)
        };
    }

    getCardsArray = () => {
        const cards = this.getCards();
        const cardsArray = [];
        for (let card of cards) {
            try {
                cardsArray.push(this.getCard(card));
            }
            catch (e) {
                console.log(e);
            }
        }
        return cardsArray;
    }

}

export default Parser;




/* import { JSDOM } from 'jsdom';

class Parser {
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(this.html);
    }

    getHtml = () => {
        return this.dom.window.document.documentElement.outerHTML;
    }

}

export default Parser; */





//Card en HTML - linea 5438
//Card ejemplo - linea 15738