const { checkbox, Separator, confirm, rawlist } = require('@inquirer/prompts');

const installAlpha_more = async () => {
    const size = await rawlist({
        message: 'Sélectionnez une taille :',
        choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
    });

    console.log(`Vous avez choisi la taille : ${size}`);
};

const installAlpha = async () => {
    try {
        const planetChoices = [
            { value: '== Telluriques ==', disabled: ' ' },
            { value: 'Mercure' },
            { value: 'Vénus' },
            { value: 'Terre', checked: true },
            { value: 'Mars' },
            new Separator(),
            { value: '== Gazeuses ==', disabled: ' ' },
            { value: 'Jupiter' },
            { value: 'Saturne' },
            { value: 'Uranus' },
            { value: 'Neptune' },
            new Separator(),
            { value: '== Autre ==', disabled: ' ' },
            { value: 'Pluton' },
        ];

        while (true) {
            const planets = await checkbox({
                message: "Sélectionnez les planètes pour l'installation :",
                choices: planetChoices,
                loop: false,
            });

            const userConfirm = await confirm({
                message: 'Êtes-vous satisfait de votre sélection ?',
                default: false,
            });

            if (userConfirm) {
                await installAlpha_more();
                console.log(`Planètes sélectionnées : ${planets.join(', ')}`);
                break;
            } else {
                console.log('Veuillez sélectionner à nouveau les planètes.');
            }
        }
    } catch (error) {
        if (error && error.name === 'ExitPromptError') {
            console.log('Au revoir !');
            return;
        }
        console.error(`Une erreur est survenue : ${error.message}`);
    }
};

module.exports = { installAlpha };
