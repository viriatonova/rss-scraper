const mongose = require('mongoose');
const fetch = require('node-fetch');
const xml2js = require('xml2js');


/**
 * Mongose Schema for MongoDB
 */
const HomeSchema = new mongose.Schema({
    nome: { type: String, required: true },
    last_edited: { type: Number, required: true },
    url: { type: String, required: true }
});

const HomeModel = mongose.model('Home', HomeSchema)


class Home {
    constructor(body, url) {
        this.body = body
        this.url = url
    };

    /**
     * Fetch XML data from some URL
     * @returns xml text
     */
    async getRSS() {
        try {
            const parser = new xml2js.Parser()
            const response = await fetch(this.url);
            const result = await response.text()
            const data = await parser.parseStringPromise(result)
            return data
        } catch (err) {
            console.log(err)
        }
    };

    /**
     * Use {this.getRSS} for fetch data and select source URL's from 
     * the feeds
     * 
     * @returns Object whitch time of check and source URL's from feeds 
     */
    async getSitesData() {
        const data = await this.getRSS(this.url)
        const items = await data.rss.channel[0].item

        this.body = {
            checkDate: data.rss.channel.lastBuildDate,
            urls: []
        }

        for (let key in items) {
            this.body.urls.push(items[key].source[0].$.url)
        }

        return this.body
    };
}

module.exports = Home;