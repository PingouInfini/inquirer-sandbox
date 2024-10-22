const { input } = require('@inquirer/prompts');
const { exec } = require('child_process');

const installEcho = async () => {
    try {
        // Demande à l'utilisateur de saisir une commande, avec "df -h" comme valeur par défaut
        const command = await input({
            message: 'Tapez une commande à exécuter :',
            default: 'df -h',
        });

        // Vérification de la commande pour des raisons de sécurité
        if (command.includes('rm')) {
            console.log('La commande "rm" est interdite pour des raisons de sécurité.');
            return;
        }

        // Exécute la commande
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de l'exécution : ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erreur dans la commande : ${stderr}`);
                return;
            }

            // Affiche le résultat de la commande
            console.log(`Résultat de la commande :\n${stdout}`);
        });
    } catch (error) {
        if (error && error.name === 'ExitPromptError') {
            console.log('Au revoir !');
            return;
        }
        console.error(`Une erreur est survenue : ${error.message}`);
    }
};

module.exports = { installEcho };
