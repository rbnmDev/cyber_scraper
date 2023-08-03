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
        return card.querySelector('div.product-price meta[itemprop="price"]').getAttribute('content');
    }
    getImage = (card) => {
        const imgElement = card.querySelector("img.img-responsive");
        const dataRValue = imgElement.getAttribute("data-r");

        // Convertir la cadena data-r en un objeto JSON
        const dataRObject = JSON.parse(dataRValue);

        // si no tiene el punto S el dataBoject devuelve un objeto
        const imageURLFull = dataRObject.s;
        const urlPrincipio = "https://www.macnificos.com/sites/files/styles/product_list_desktop_1x"
        const imageURL = `${urlPrincipio}${imageURLFull}`;
        console.log(imageURL);
        return imageURL;
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





//Card en HTML - linea 5438
//Card ejemplo - linea 15738