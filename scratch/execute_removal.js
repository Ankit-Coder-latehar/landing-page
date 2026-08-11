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

let updatedFilesCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Desktop Nav Menu
  content = content.replace(/<ul class="nav-menu">([\s\S]*?)<\/ul>/gi, (match, menuContent) => {
    // Split into individual <li class="nav-item"> blocks
    // We regex match <li class="nav-item"> ... </li>
    // Note: mega-dropdown is inside <li class="nav-item">
    let items = [];
    let regex = /[\t ]*<li class="nav-item">([\s\S]*?)<\/li>/gi;
    let lastIndex = 0;
    let m;

    let newMenuContent = menuContent;

    // Alternative: match each <li class="nav-item">...</li> block by balancing or splitting
    // Since <li class="nav-item"> does not contain nested <li class="nav-item">, regex works!
    let liBlocks = menuContent.match(/[\t ]*<li class="nav-item">[\s\S]*?<\/li>/gi);
    if (liBlocks) {
      let filteredLiBlocks = liBlocks.filter(block => {
        // Check if this nav-item block has Programs link/header
        if (/class="nav-link"[^>]*>[\s\n]*Programs/i.test(block) ||
            /href="[^"]*programs(?:\.html|\.php|#programs)?"[^>]*class="nav-link"/i.test(block)) {
          return false; // remove it
        }
        return true;
      });
      newMenuContent = '\n' + filteredLiBlocks.join('\n') + '\n      ';
    }

    return `<ul class="nav-menu">${newMenuContent}</ul>`;
  });

  // 2. Mobile Drawer Menu
  content = content.replace(/<ul class="drawer-menu">([\s\S]*?)<\/ul>/gi, (match, drawerContent) => {
    let liBlocks = drawerContent.match(/[\t ]*<li>[\s\S]*?<\/li>/gi);
    if (liBlocks) {
      let filteredLiBlocks = liBlocks.filter(block => {
        if (/href="[^"]*programs[^"]*"/i.test(block) || />\s*Programs Offered\s*</i.test(block)) {
          return false; // remove it
        }
        return true;
      });
      let newDrawerContent = '\n' + filteredLiBlocks.join('\n') + '\n    ';
      return `<ul class="drawer-menu">${newDrawerContent}</ul>`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedFilesCount++;
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
  }
});

console.log(`\nSuccessfully updated ${updatedFilesCount} files.`);
