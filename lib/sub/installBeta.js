const inquirer = require('inquirer').default;

const validatePassword = (input) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}$/;
    return regex.test(input) ? true : 'Le mot de passe doit contenir au moins 14 caractères avec 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.';
};

const installBeta = async () => {
    const { username, firstname, password, confirmPassword, height, phoneNumber } = await inquirer.prompt([
        { type: 'input', name: 'username', message: 'Nom d\'utilisateur :'},
        { type: 'input', name: 'firstname', message: 'Prénom :'},
        { type: 'password', name: 'password', message: 'Mot de passe :', mask: '*', validate: validatePassword },
        { type: 'password', name: 'confirmPassword', message: 'Confirmez le mot de passe :', mask: '*', validate: (input, answers) => input === answers.password || 'Les mots de passe ne correspondent pas.'},
        { type: 'number', name: 'height', message: 'Taille en cm :', validate: (input) => input >= 10 && input <= 250 ? true : 'Veuillez entrer une taille valide.' },
        { type: 'input', name: 'phoneNumber', message: 'Numéro de téléphone :', validate: (input) => /\+?\d+([-.\s]?\d+)+/.test(input) || 'Numéro de téléphone invalide.' }
    ]);

    console.log(`Informations collectées :
    - Nom d'utilisateur: ${username}
    - Prénom: ${firstname}
    - Taille: ${height} cm
    - Numéro de téléphone: ${phoneNumber}`);
};

module.exports = { installBeta };
