const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

const htmlFiles = getAllFiles(rootDir);
let missingCount = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(rootDir, file);
  
  // Find all src="..." and href="..." references to assets
  const regex = /(?:src|href)=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith('/assets/') || url.startsWith('assets/')) {
      const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
      const targetPath = path.join(rootDir, cleanUrl);
      if (!fs.existsSync(targetPath)) {
        console.error(`MISSING in ${relFile}: ${url} -> ${cleanUrl}`);
        missingCount++;
      } else {
        // Check case sensitivity
        const dir = path.dirname(targetPath);
        const base = path.basename(targetPath);
        const actualFiles = fs.readdirSync(dir);
        if (!actualFiles.includes(base)) {
          console.error(`CASE MISMATCH in ${relFile}: ${url} (found ${actualFiles.find(f => f.toLowerCase() === base.toLowerCase())})`);
          missingCount++;
        }
      }
    }
  }
});

console.log(`Path Verification Done. Missing or Case Mismatches: ${missingCount}`);
