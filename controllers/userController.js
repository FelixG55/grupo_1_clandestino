const path = require('path');

const login = (req, res) => {
    res.render(path.join(__dirname, './views/login'));
};

const reservation = (req, res) => {
    res.render(path.join(__dirname, './views/reservation'));
};

const register = (req, res) => {
    res.render(path.join(__dirname, './views/register'));
};

module.exports = {
    login,
    reservation,
    register
};