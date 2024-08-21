const applicationTests = require('./applicationTests/applicationTests');

async function executeTests() {
    await applicationTests();
}

executeTests();