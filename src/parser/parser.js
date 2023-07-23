import {JSDOM} from 'jsdom';

class Parser {
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(this.html);
    }
    getCards = () => {
        return this.dom.window.document.querySelectorAll("SELECTOR");
    }
    getTitle = (card) => {
        return card.querySelector("SELECTOR").textContent.trim();
    }
    getPrice = (card) => {
        return card.querySelector("SELECTOR").textContent.trim();
    }
    getImage = (card) => {
        return card.querySelector("SELECTOR").getAttribute("src");
    }
    getUrl = (card) => {
        return "URL!!!!!!!"+card.querySelector("SELECTOR").getAttribute("href");
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
        for(let card of cards){
            try{
                cardsArray.push(this.getCard(card));
            }
            catch(e){
                console.log(e);
            }
        }
        return cardsArray;
    }


}

export default Parser;