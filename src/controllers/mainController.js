const path = require('path');

const index = (req, res) => {
    res.render(path.join(__dirname, '../views/index'),({style: "styles-index" }));
};

const location = (req, res) => {
    res.render(path.join(__dirname, '../views/location'),{style: "styles-location"});
};

module.exports = {
    index,
    location,
};
