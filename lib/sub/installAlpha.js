const inquirer = require('inquirer');

const installAlpha_more = async () => {
    const { size } = await inquirer.prompt([{
        type: 'rawlist',
        name: 'size',
        message: 'Sélectionnez une taille :',
        choices: ['Jumbo', 'Large', new inquirer.Separator(), 'Standard', 'Medium', new inquirer.Separator(), 'Small', 'Micro'],
    }]);

    console.log(`Vous avez choisi la taille : ${size}`);
};

const installAlpha = async () => {
    const planetChoices = [
        new inquirer.Separator('== Telluriques =='),
        { name: 'Mercure' },
        { name: 'Vénus' },
        { name: 'Terre', checked: true },
        { name: 'Mars' },
        new inquirer.Separator('== Gazeuses =='),
        { name: 'Jupiter' },
        { name: 'Saturne' },
        { name: 'Uranus' },
        { name: 'Neptune' },
        new inquirer.Separator('== Autre =='),
        { name: 'Pluton' }
    ];

    while (true) {
        const { planets } = await inquirer.prompt([{
            type: 'checkbox',
            name: 'planets',
            message: 'Sélectionnez les planètes pour l\'installation :',
            choices: planetChoices
        }]);

        const { confirm } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'Êtes-vous satisfait de votre sélection ?',
            default: false
        }]);

        if (confirm) {
            await installAlpha_more();
            console.log(`Planètes sélectionnées : ${planets.join(', ')}`);
            break;
        }
    }
};

module.exports = { installAlpha };
