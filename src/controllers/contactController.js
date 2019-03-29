const Contact = require('../models/contact');

module.exports = {
    async index(req, res){
      try{
        contacts = await Contact.find({}).sort('-createdAt');

        return res.json(contacts);
      } catch {
        return res.status(400).send({error: 'List Contact Error'});
      }
      
    },

    async store(req, res){
      try{
        contact = await Contact.create(req.body);

        req.io.emit('contact', contact);
 
        return res.json(contact);
      } catch {
        return res.status(400).send({error: 'Add Contact Error'});
      }
      
    },

    async destroy(req, res){
       try{
        contact = await Contact.findById(req.params.id);

        await Contact.findByIdAndDelete(contact);
        
        return res.send({success : 'Contact Removed'});
       } catch {
        return res.status(400).send({error: 'Remove Contact Error'});
       }
        
    }
}