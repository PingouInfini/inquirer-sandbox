const fs = require('fs');

function afficherLignesFichier(fichier, nbLignes = 10) {
  const data = fs.readFileSync(fichier, 'utf-8');
  const lines = data.split('\n').slice(0, nbLignes);

  const title = `${fichier}`;
  const maxLength = Math.min(Math.max(...lines.map(line => line.length), title.length) + 50, 75);
  const border = '*'.repeat(maxLength + 4);
  const separator = `* ${'-'.repeat(maxLength)} *`;
  const framedLines = lines.map(line => `* ${line.padEnd(maxLength, ' ')} *`);

  return [
    border,
    `* ${title.padEnd(maxLength, ' ')} *`,
    separator,
    ...framedLines,
    border
  ].join('\n');
}

module.exports = { afficherLignesFichier };
