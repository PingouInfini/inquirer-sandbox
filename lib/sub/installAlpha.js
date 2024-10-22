const inquirer = require('inquirer');

async function installAlpha() {
  const planets = [
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

  let confirmed = false;
  let selectedPlanets = [];

  while (!confirmed) {
    const planetChoices = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedPlanets',
        message: 'Sélectionnez les planètes à installer :',
        choices: planets
      }
    ]);

    selectedPlanets = planetChoices.selectedPlanets;

    const confirmAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isSatisfactory',
        message: 'Votre sélection est-elle satisfaisante ?',
        default: false
      }
    ]);

    confirmed = confirmAnswer.isSatisfactory;
  }

  await installAlpha_more(selectedPlanets);
}

async function installAlpha_more(selectedPlanets) {
  const sizes = [
    'Jumbo', 'Large', new inquirer.Separator(), 'Standard', 'Medium', new inquirer.Separator(), 'Small', 'Micro'
  ];

  const sizeAnswer = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'size',
      message: 'Choisissez une taille :',
      choices: sizes
    }
  ]);

  console.log(`Résumé : Planètes sélectionnées : ${selectedPlanets.join(', ')}, Taille choisie : ${sizeAnswer.size}`);
}

module.exports = { installAlpha };
