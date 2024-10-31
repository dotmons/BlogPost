const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username }).exec();

        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                req.session.userId = user._id;
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during login');
    }
};
