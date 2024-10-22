const inquirer = require('inquirer');

async function installBeta() {
  const userInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Entrez le nom d\'utilisateur :'
    },
    {
      type: 'input',
      name: 'firstname',
      message: 'Entrez le prénom :'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Entrez le mot de passe (14 caractères min) :',
      mask: '*',
      validate: function (input) {
        const password = input;
        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{14,}$/;
        if (!passRegex.test(password)) {
          return 'Le mot de passe doit comporter au moins 14 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.';
        }
        return true;
      }
    },
    {
      type: 'password',
      name: 'confirmPassword',
      message: 'Confirmez le mot de passe :',
      mask: '*',
      validate: function (input, answers) {
        if (input !== answers.password) {
          return 'Les mots de passe ne correspondent pas !';
        }
        return true;
      }
    },
    {
      type: 'number',
      name: 'height',
      message: 'Indiquez votre taille en cm :',
      validate: function (input) {
        if (input < 10 || input > 250) {
          return 'La taille doit être comprise entre 10 et 250 cm.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'phone',
      message: 'Entrez votre numéro de téléphone :',
      validate: function (input) {
        const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/;
        if (!phoneRegex.test(input)) {
          return 'Le numéro de téléphone est invalide.';
        }
        return true;
      }
    }
  ]);

  console.log('Récapitulatif :', userInfo);
}

module.exports = { installBeta };
