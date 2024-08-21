const getHomePage = require('./getHomePage');
const postHomePage = require('./postHomePage');

module.exports = async function() {
    await getHomePage();
    await postHomePage();
}