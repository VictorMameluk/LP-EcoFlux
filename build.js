const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Criando bundle estático em ./public ...');

// 1. Limpar / garantir public
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// 2. Copiar index.html
fs.copyFileSync('index.html', path.join('public', 'index.html'));

// 3. Copiar assets/
if (fs.existsSync('assets')) {
  copyDir('assets', path.join('public', 'assets'));
}

// 4. Copiar dist/
if (fs.existsSync('dist')) {
  copyDir('dist', path.join('public', 'dist'));
}

console.log('✓ Pasta public/ montada com sucesso!');
