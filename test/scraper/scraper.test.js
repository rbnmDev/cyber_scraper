import Scraper from "../../src/scraper/scraper.js";

describe("Scraper", () => {
    let scraper;
    beforeAll(async () => {
        scraper = new Scraper(false);
        await scraper.init();
    });
    afterAll(async () => {
        await scraper.close();
    });
    it("should return a string", async () => {
        let query = "iphone";
        const content = await scraper.scrap(query,2);
        expect(content).toContain("Amazon.es");
    }, 30000);
});