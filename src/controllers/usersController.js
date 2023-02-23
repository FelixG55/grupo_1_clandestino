const path = require('path');

const login = (req, res) => {
    res.render(path.join(__dirname, '../views/login'),{style: "styles-login"});
};

const reservation = (req, res) => {
    res.render(path.join(__dirname, '../views/reservation'),{style: "styles-reservation"});
};

const register = (req, res) => {
    res.render(path.join(__dirname, '../views/register'),{style: "styles-register"});
};

module.exports = {
    login,
    reservation,
    register
};