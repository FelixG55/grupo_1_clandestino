const path = require('path');

const index = (req, res) => {
    res.render(path.join(__dirname, './views/index'));
};

const location = (req, res) => {
    res.render(path.join(__dirname, './views/location'));
};

module.exports = {
    index,
    location
};
