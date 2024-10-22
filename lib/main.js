const inquirer = require('inquirer');
const { installAlpha } = require('./sub/installAlpha');
const { installBeta } = require('./sub/installBeta');
const { installGamma } = require('./sub/installGamma');

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'installType',
      message: 'Quel type d\'installation souhaitez-vous ?',
      choices: ['Type d\'installation Alpha', 'Type d\'installation Beta', 'Type d\'installation Gamma']
    }
  ]);

  if (answers.installType === 'Type d\'installation Alpha') {
    await installAlpha();
  } else if (answers.installType === 'Type d\'installation Beta') {
    await installBeta();
  } else {
    await installGamma();
  }
}

main();
