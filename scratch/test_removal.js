const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.html') || file.endsWith('.php')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getAllFiles(rootDir);

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let rel = path.relative(rootDir, filePath);

  let navMenuHasPrograms = false;
  const navMenuMatch = content.match(/<ul class="nav-menu">([\s\S]*?)<\/ul>/);
  if (navMenuMatch && navMenuMatch[1].includes('Programs')) {
    navMenuHasPrograms = true;
  }

  let drawerHasPrograms = false;
  const drawerMatch = content.match(/<ul class="drawer-menu">([\s\S]*?)<\/ul>/);
  if (drawerMatch && drawerMatch[1].includes('programs')) {
    drawerHasPrograms = true;
  }

  if (navMenuHasPrograms !== drawerHasPrograms) {
    console.log(`Mismatch in ${rel}: navMenuHasPrograms=${navMenuHasPrograms}, drawerHasPrograms=${drawerHasPrograms}`);
  }
});
