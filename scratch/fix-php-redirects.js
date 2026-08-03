const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const map = {
  'index.php': '/index.html',
  'about-us.php': '/about-us.html',
  'apply-now.php': '/apply-now.html',
  'contact-us.php': '/contact-us.html',
  'programs.php': '/programs.html'
};

for (const [file, target] of Object.entries(map)) {
  const filePath = path.join(rootDir, file);
  const content = `<?php
header("Location: ${target}", true, 301);
exit();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${target}">
  <script>window.location.href="${target}";</script>
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${target}">${target}</a>...</p>
</body>
</html>
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated PHP redirect file: ${file} -> ${target}`);
}
