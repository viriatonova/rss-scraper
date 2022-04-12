const Home = require('../models/HomeModel');
const googleRSS = require("../data/googleRSS.json")

exports.index = async (req, resp) => {
    const url = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';
    const body = {};
    const home = new Home(body);
    await home.getRSS(url);
    await home.getSitesData(googleRSS);
    await resp.send(home.body);
};