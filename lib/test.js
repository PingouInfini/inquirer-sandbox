const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer').default;
const { execSync } = require('child_process');
const { inquirerList } = require('./inquirer/inquirer-prompts');

// Chemin vers le fichier inventory.txt
const inventoryPath = path.join(__dirname, '../inventaires/inventory.txt');


function loremIpsumAction() {

}

// Fonction pour lancer l'éditeur de texte
function ouvrirEditeurFichier(fichier) {
  const editor = process.env.EDITOR || 'nano';  // Utilise nano ou l'éditeur configuré
  const command = `${editor} ${fichier}`;

  try {
    // Exécute la commande synchronement, attend que l'éditeur soit fermé
    execSync(command, { stdio: 'inherit' }); // Hérite des E/S pour permettre l'interaction avec l'éditeur
	editerFichierInventoryAction();
  } catch (error) {
    console.error(`Erreur lors de l'ouverture de l'éditeur : ${error.message}`);
    process.exit(1);  // Quitte en cas d'erreur
  }
}

// Fonction pour afficher les 5 premières lignes du fichier
function afficherLignesFichier(fichier, nbLignes = 5) {
  const data = fs.readFileSync(fichier, 'utf-8');
  const lines = data.split('\n').slice(0, nbLignes);

  const title = `${fichier}`;
  
  // Déterminer la longueur maximale des lignes (incluant le titre)
  const maxLength = Math.min(Math.max(...lines.map(line => line.length), title.length) + 50, 75);

  // Générer la ligne supérieure et inférieure du cadre
  const border = '*'.repeat(maxLength + 4);  // 4 pour l'espace avant/après le contenu

  // Générer le séparateur de tirets
  const separator = `* ${'-'.repeat(maxLength)} *`;

  // Générer le contenu avec le cadre
  const framedLines = lines.map(line => `* ${line.padEnd(maxLength, ' ')} *`);

  // Assemble le cadre complet
  return [
	"",
    border,
    `* ${title.padEnd(maxLength, ' ')} *`,
    separator,
    ...framedLines,
    border,
	""
  ].join('\n');
}


// Fonction pour éditer le fichier inventory.txt
function editerFichierInventoryAction() {

  const contenu = afficherLignesFichier(inventoryPath);
  console.log(`${contenu}`)
  
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'satisfait',
      message: `Êtes-vous satisfait des modifications ?`,
      default: true
    }
  ]).then(answers => {
    if (answers.satisfait) {
      console.log("Et bien tant mieux.");
      process.exit(0);  // Quitter le programme
    } else {
      console.log("Réédition du fichier...");
      
	  ouvrirEditeurFichier(inventoryPath, (err) => {
        if (err) {
          console.log("Une erreur est survenue lors de la modification du fichier.");
          process.exit(1);
        }
      });
    }
  });
}

// Action pour quitter le programme
function quitterProgrammeAction() {
  console.log("Fermeture du programme.");
  process.exit(0);
}

// Variable pour les options du menu et les actions associées
const menuOptions = {
  'Lorem ipsum dolor sit amet': loremIpsumAction,
  'Test edition fichier': editerFichierInventoryAction,
  'Consectetur adipiscing elit': quitterProgrammeAction,
  'Quitter': quitterProgrammeAction
};

// Lancer le menu principal
inquirerList(menuOptions, 'Que souhaitez-vous faire ?');

