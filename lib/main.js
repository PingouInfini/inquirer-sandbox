const { select, Separator } = require('@inquirer/prompts');

const { installAlpha } = require('./sub/installAlpha');
const { installBravo } = require('./sub/installBravo');
const { installCharlie } = require('./sub/installCharlie');
const { installDelta } = require('./sub/installDelta');
const { installEcho } = require('./sub/installEcho');

const main = async () => {
    try {
        const installType = await select({
            message: 'Que souhaitez-vous faire ?',
            loop: false,
            choices: [
                {
                value: 'Démonstration Alpha',
                description: 'Démo des prompts \'checkbox\', \'confirm\', et \'rawlist\' de @inquirer/prompts',
                },
                {
                value: 'Démonstration Bravo',
                description: 'Démo des prompts \'input\', \'password\' et \'number\' de @inquirer/prompts',
                },
                {
                value: 'Démonstration Charlie',
                description: 'Démo de l\'édition de fichier et validation avec le prompt \'confirm\' de @inquirer/prompts',
                },
                {
                value: 'Démonstration Delta',
                description: 'Démo du prompt \'search\' de @inquirer/prompts',
                },
                {
                value: 'Démonstration Echo',
                description: 'Démo d\'un lancement d\'une commande',
                },
                new Separator(),
                {
                    value: 'Quitter'
                },
            ],
        });

        switch (installType) {
            case 'Démonstration Alpha':
                await installAlpha();
                break;
            case 'Démonstration Bravo':
                await installBravo();
                break;
            case 'Démonstration Charlie':
                await installCharlie();
                break;
            case 'Démonstration Delta':
                await installDelta();
                break;
            case 'Démonstration Echo':
                await installEcho();
                break;
            case 'Quitter':
                console.log('Vous avez choisi de quitter. Au revoir !');
                break;
        }
    } catch (error) {
        if (error && error.name === 'ExitPromptError') {
            console.log('Au revoir !');
            return;
        }
        console.error(`Une erreur est survenue : ${error.message}`);
    }
};

main();
