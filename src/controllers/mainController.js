const path = require('path');

const index = (req, res) => {
    console.log(req.session.userLogged);
    let profile = req.session.userLogged;
    res.render(path.join(__dirname, '../views/index'),({profile: profile,style: "styles-index"}));
};

const location = (req, res) => {
    res.render(path.join(__dirname, '../views/location'),{style: "styles-location"});
};


module.exports = {
    index,
    location,};
