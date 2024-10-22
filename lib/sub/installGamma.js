const fs = require('fs');
const inquirer = require('inquirer').default;
const { afficherLignesFichier } = require('../utils');

const installGamma = async () => {
    const filePath = './lib/inventories/inventory.txt';

    if (!fs.existsSync(filePath)) {
        console.log('Fichier inventaire non trouvé. Annulation.');
        return;
    }

    while (true) {
        console.log(afficherLignesFichier(filePath));

        const { confirm } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'Êtes-vous satisfait du contenu du fichier ?',
            default: true
        }]);

        if (confirm) {
            break;
        } else {
            // Ouvrir l'éditeur pour modifier le fichier
            require('child_process').spawnSync(process.env.EDITOR || 'nano', [filePath], { stdio: 'inherit' });
        }
    }
};

module.exports = { installGamma };
