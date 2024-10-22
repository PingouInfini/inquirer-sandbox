const { input, password, number } = require('@inquirer/prompts');

const installBravo = async () => {
    try {
        const username = await input({ message: "Nom d'utilisateur :" });
        const firstname = await input({ message: "Prénom :" });

        const passwordValue = await password({
            message: 'Mot de passe :',
            validate: (input) => {
                const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}$/;
                return passPattern.test(input) || 'Le mot de passe doit faire au moins 14 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.';
            }
        });

        const confirmPassword = await password({
            message: 'Confirmez le mot de passe :',
            validate: (input) => {
                return input === passwordValue || 'Les mots de passe ne correspondent pas.';
            }
        });

        const height = await number({
            message: 'Taille (cm) :',
            validate: (input) => (input >= 10 && input <= 250) || 'La taille doit être entre 10 cm et 250 cm.',
        });

        const phoneNumber = await input({
            message: 'Numéro de téléphone :',
            validate: (input) => {
                const phonePattern = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
                return phonePattern.test(input) || 'Numéro de téléphone invalide. Veuillez entrer un numéro valide.';
            }
        });

        console.log(`Informations renseignées :
        - Nom d'utilisateur: ${username}
        - Prénom: ${firstname}
        - Password: ${confirmPassword}
        - Taille: ${height} cm
        - Numéro de téléphone: ${phoneNumber}`);
    } catch (error) {
        if (error && error.name === 'ExitPromptError') {
            console.log('Au revoir !');
            return;
        }
        console.error(`Une erreur est survenue : ${error.message}`);
    }
};

module.exports = { installBravo };
