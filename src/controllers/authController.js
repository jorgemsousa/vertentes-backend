const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = {
    async index(req, res){

        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');
        if (!user)          
          return res.status(400).send({ error : 'User not found'}); 
          
        if(!await bcrypt.compare(password, user.password))
          return res.status(400).send({ error: 'Invalid Password' });

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: 86400,
        })

        res.send({ user, token });
    }
}