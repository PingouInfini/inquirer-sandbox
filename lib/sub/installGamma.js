const fs = require('fs');
const { afficherLignesFichier } = require('../utils');

async function installGamma() {
  const inventoryPath = './lib/inventories/inventory.txt';

  if (!fs.existsSync(inventoryPath)) {
    console.log('Le fichier inventory.txt n\'existe pas. Fin du processus.');
    return;
  }

  let satisfied = false;
  while (!satisfied) {
    const output = afficherLignesFichier(inventoryPath);
    console.log(output);

    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isSatisfactory',
        message: 'Êtes-vous satisfait du contenu du fichier ?',
        default: true
      }
    ]);

    satisfied = answer.isSatisfactory;

    if (!satisfied) {
      execSync(`nano ${inventoryPath}`, { stdio: 'inherit' });
    }
  }
}

module.exports = { installGamma };
