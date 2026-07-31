const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!['.git', 'node_modules', '.next', '.claude', '.cursor'].includes(file)) {
        results = results.concat(walk(filePath));
      }
    } else {
      results.push(filePath);
    }
  });
  return results;
};

const files = walk('.');
let replacedFiles = 0;

files.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.md') || file.endsWith('.json') || file.endsWith('.sh') || file.endsWith('.conf') || file.endsWith('.css') || file.endsWith('.webmanifest')) {
    const content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(/Demo Realty/g, 'Demo Realty');
    newContent = newContent.replace(/demorealty\.ru/g, 'example.com');
    newContent = newContent.replace(/demorealty/g, 'demorealty');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      replacedFiles++;
      console.log('Replaced in ' + file);
    }
  }
});
console.log('Total files changed: ' + replacedFiles);
