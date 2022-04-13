const Home = require('../models/HomeModel');

exports.index = async (req, resp) => {
    const url = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';
    let body = {};
    const home = new Home(body, url);
    await home.getSitesData()
    body = await home.body
    resp.send(body)
};