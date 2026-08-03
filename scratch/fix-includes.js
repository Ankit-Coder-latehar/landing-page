const fs = require('fs');
const path = require('path');

const includesDir = path.resolve(__dirname, '../includes');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/src=["'](?:\.\.\/)?assets\//g, 'src="/assets/');
  content = content.replace(/href=["'](?:\.\.\/)?assets\//g, 'href="/assets/');
  content = content.replace(/href=["'](?:\.\/|\/)?index\.php/g, 'href="/index.html');
  content = content.replace(/href=["'](?:\.\/|\/)?about-us\.php/g, 'href="/about-us.html');
  content = content.replace(/href=["'](?:\.\/|\/)?programs\.php/g, 'href="/programs.html');
  content = content.replace(/href=["'](?:\.\/|\/)?contact-us\.php/g, 'href="/contact-us.html');
  content = content.replace(/href=["'](?:\.\/|\/)?apply-now\.php/g, 'href="/apply-now.html');
  content = content.replace(/href=["']masters-business-administration-online-degree\.html/g, 'href="/masters-business-administration-online-degree.html');
  content = content.replace(/href=["']bachelors-business-administration-online-degree\.html/g, 'href="/bachelors-business-administration-online-degree.html');
  content = content.replace(/href=["']bachelor-computer-application-online-degree\.html/g, 'href="/bachelor-computer-application-online-degree.html');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed include:', path.basename(filePath));
}

const files = fs.readdirSync(includesDir);
files.forEach(f => {
  if (f.endsWith('.php')) {
    fixFile(path.join(includesDir, f));
  }
});
