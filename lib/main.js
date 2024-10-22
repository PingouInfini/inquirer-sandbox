const inquirer = require('inquirer').default;
const { installAlpha } = require('./sub/installAlpha');
const { installBeta } = require('./sub/installBeta');
const { installGamma } = require('./sub/installGamma');

const main = async () => {
    const { installType } = await inquirer.prompt([{
        type: 'list',
        name: 'installType',
        message: 'Que souhaitez-vous installer ?',
        choices: ['Type d\'installation Alpha', 'Type d\'installation Beta', 'Type d\'installation Gamma'],
    }]);

    switch (installType) {
        case 'Type d\'installation Alpha':
            await installAlpha();
            break;
        case 'Type d\'installation Beta':
            await installBeta();
            break;
        case 'Type d\'installation Gamma':
            await installGamma();
            break;
    }
};

main();
