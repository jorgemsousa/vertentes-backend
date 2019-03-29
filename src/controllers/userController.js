const User = require('../models/user');



module.exports = {
    async index(req, res){
      try{
        users = await User.find({});

        return res.json(users);
      } catch {
          return res.status(400).send({error: 'Error while listing'})
      }
      
    },

    async store(req, res){
        const { email } = req.body;

        try{
            if(await User.findOne({ email }))
              return res.status(400).send({ error: 'User already exists'});

            user = await User.create(req.body);

            user.password = undefined;

            req.io.emit('user', user);
     
            return res.json(user);
        } catch {
            return res.status(400).send({error: 'Register failed'});
        }
       
    },

    async destroy(req, res){
        try{

            const user = await User.findById(req.params.id);

            if(!user)
              return res.status(400).send({ error: 'User not exists'});
           

            await User.findByIdAndDelete(user);

            return res.send({success : 'User Removed'});

        } catch {
            return res.status(400).send({error: 'Fail to remove Register'});
        }
    },

    async update(req, res){
      
             
      
        
    }
}