const NewsLetter = require('../models/newsletter');

module.exports = {
    async index(req, res){
      newsletters = await NewsLetter.find({});

      return res.json(newsletters);
    },

    async store(req, res){
       newsletter = await NewsLetter.create(req.body);

       req.io.emit('newsletter', newsletter);

       return res.json(newsletter);
    }
}