const sharp = require('sharp');
const fs = require('fs');

async function convert() {
  try {
    if (fs.existsSync('public/images/pdg.png')) {
      await sharp('public/images/pdg.png')
        .webp({ quality: 80 })
        .toFile('public/images/pdg.webp');
      console.log('pdg.png converti en pdg.webp');
    }
    
    if (fs.existsSync('public/images/logo.png')) {
      await sharp('public/images/logo.png')
        .webp({ quality: 90 })
        .toFile('public/images/logo.webp');
      console.log('logo.png converti en logo.webp');
    }
  } catch (error) {
    console.error('Erreur de conversion:', error);
  }
}

convert();
