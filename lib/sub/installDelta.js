const fs = require('fs');
const { search, Separator } = require('@inquirer/prompts');

const installDelta = async () => {
    try {
        // Lecture du fichier de pays
        const filePath = './lib/assets/country.txt';
        if (!fs.existsSync(filePath)) {
            console.log('Fichier de pays non trouvé.');
            return;
        }

        const countries = fs.readFileSync(filePath, 'utf8').split('\n').map(country => country.trim()).filter(Boolean);

        const answer = await search({
            message: 'Sélectionnez un pays :',
            source: async (input) => {
                if (!input) {
                    return countries.map(country => ({
                        name: country,
                        value: country,
                    }));
                }

                // Filtrer les pays selon l'entrée utilisateur
                const filteredCountries = countries.filter(country =>
                    country.toLowerCase().includes(input.toLowerCase())
                );

                return filteredCountries.map(country => ({
                    name: country,
                    value: country,
                }));
            },
        });

        console.log(`Vous avez sélectionné : ${answer}`);
    } catch (error) {
        if (error && error.name === 'ExitPromptError') {
            console.log('Au revoir !');
            return;
        }
        console.error(`Une erreur est survenue : ${error.message}`);
    }
};

module.exports = { installDelta };
