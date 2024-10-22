const inquirer = require('inquirer').default;

const validatePassword = (input) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}$/;
    return regex.test(input) ? true : 'Le mot de passe doit contenir au moins 14 caractères avec 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.';
};

const installBeta = async () => {

    const answers = await inquirer.prompt([
        { type: 'input', name: 'username', message: "Nom d'utilisateur :" },
        { type: 'input', name: 'firstname', message: "Prénom :" },
        { type: 'password', name: 'password', message: 'Mot de passe :', mask: '*', validate: (input) => {
            const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}$/;
            return passPattern.test(input) || 'Le mot de passe doit faire au moins 14 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.';
        }},
    ]);

    const confirmPassword = await inquirer.prompt([
        { type: 'password', name: 'confirmPassword', message: 'Confirmez le mot de passe :', mask: '*', validate: (input) => {
            return input === answers.password || 'Les mots de passe ne correspondent pas.';
        }},
    ]);

    const moreAnswers = await inquirer.prompt([
        { type: 'number', name: 'height', message: 'Taille (cm) :', validate: (input) => {
            return (input >= 10 && input <= 250) || 'La taille doit être entre 10 cm et 250 cm.';
        }},
        { type: 'input', name: 'phoneNumber', message: 'Numéro de téléphone :', validate: (input) => {
            const phonePattern = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
            return phonePattern.test(input) || 'Numéro de téléphone invalide. Veuillez entrer un numéro valide.';
        }},
    ]);

    console.log(`Informations renseignées :
    - Nom d'utilisateur: ${answers.username}
    - Prénom: ${answers.firstname}
    - Password: ${confirmPassword.confirmPassword}
    - Taille: ${moreAnswers.height} cm
    - Numéro de téléphone: ${moreAnswers.phoneNumber}`);
};

module.exports = { installBeta };
