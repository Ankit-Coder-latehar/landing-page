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

const allFiles = getAllFiles(rootDir);

allFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('class="site-header"') || content.includes('<header')) {
    // Check nav-menu
    const navMenuMatch = content.match(/<ul class="nav-menu">([\s\S]*?)<\/ul>/);
    if (navMenuMatch) {
      const navMenu = navMenuMatch[1];
      if (navMenu.includes('Programs')) {
        // print relative path
      }
    }
  }
});

// Let's test regex patterns on index.html, about-us.html, includes/header.php, online-mba/marketing.html
['index.html', 'about-us.html', 'includes/header.php', 'online-mba/marketing.html'].forEach(rel => {
  const fp = path.join(rootDir, rel);
  if (!fs.existsSync(fp)) return;
  const content = fs.readFileSync(fp, 'utf8');
  console.log(`--- ${rel} ---`);
  
  // Desktop header nav-item match
  // We want to see how <li class="nav-item"> with Programs is formatted
  const items = content.split('<li class="nav-item">');
  items.forEach((item, idx) => {
    if (item.includes('Programs') || item.includes('programs.html') || item.includes('#programs')) {
      console.log(`[Desktop Nav Item in ${rel}]:`);
      console.log(item.substring(0, 300) + '...');
    }
  });

  // Mobile drawer match
  const drawerMatch = content.match(/<ul class="drawer-menu">([\s\S]*?)<\/ul>/);
  if (drawerMatch) {
    console.log(`[Mobile Drawer in ${rel}]:`);
    console.log(drawerMatch[1]);
  }
});
