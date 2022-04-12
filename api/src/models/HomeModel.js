const mongose = require('mongoose');
const fetch = require('node-fetch');
const xml = require('xml-js');
const fs = require('fs');



const HomeSchema = new mongose.Schema({
    nome: { type: String, required: true },
    last_edited: { type: Number, required: true},
    url: { type: String, required: true }
});

const HomeModel = mongose.model('Home', HomeSchema)

class Home {
    constructor(body) {
        this.body = body
    };

    async getRSS (url) {
        try {
            const response = await fetch(url);
            const result = await response.text()
            const data = await xml.xml2json(result, {compact: true, spaces: 4});
            const siteName = url.match(/(?<=\.)(.+?)(?=\.)/g)
            fs.writeFileSync(`../data/${siteName}RSS.json`, data)
            return
        } catch (err) {
            console.log(err)
         
        }
    };

    
    getSitesData(file) {
        const items = file.rss.channel.item
        this.body = {
            checkDate: file.rss.channel.lastBuildDate._text,
            urls:[]
        }

        for (let key in items) {
            this.body.urls.push(items[key].source._attributes.url)
        }

        return this.body
    };
}

module.exports = Home;