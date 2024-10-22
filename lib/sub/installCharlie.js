const fs = require('fs');
const { afficherLignesFichier } = require('../utils');
const { confirm } = require('@inquirer/prompts');

const installCharlie = async () => {
    try {
        const filePath = './inventories/inventory.ini';

        if (!fs.existsSync(filePath)) {
            console.log('Fichier inventaire non trouvé. Annulation.');
            return;
        }

        let userConfirm = false;

        // Boucle jusqu'à ce que l'utilisateur soit satisfait du contenu du fichier
        while (!userConfirm) {
            console.log(afficherLignesFichier(filePath));

            // Demande à l'utilisateur s'il est satisfait du contenu
            userConfirm = await confirm({
                message: 'Êtes-vous satisfait du contenu du fichier ?',
                default: true
            });

            // Si l'utilisateur n'est pas satisfait, on ouvre l'éditeur
            if (!userConfirm) {
                require('child_process').spawnSync(process.env.EDITOR || 'nano', [filePath], { stdio: 'inherit' });
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

module.exports = { installCharlie };