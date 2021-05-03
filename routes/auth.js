const router = require('express').Router();
const user = require('../model/User');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

const { registervalidation } = require('../validation');
const { loginvalidation } = require('../validation');



router.post('/register', async (req, res) => {
    const { error } = registervalidation(req.body);
    if(error) return res.send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email already registered.');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send("email registered");
    }
    catch(err)
    {
        res.status(400).send('failed:' + err);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginvalidation(req.body);
    if(error) return res.send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('email does not exist');

    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if(!validpassword) return res.status(400).send("Password invalid");

    res.send("login success");
});

module.exports = router;