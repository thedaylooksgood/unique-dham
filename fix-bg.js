const fs = require('fs');
const path = require('path');
const dir = 'd:/Techfleek/maa-unique-dham/src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'HeroSection.tsx');

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  content = content.replace(/className=\"([^\"]*)bg-ivory([^\"]*)\"/g, 'className=\"$1bg-transparent$2\"');
  content = content.replace(/className=\"([^\"]*)bg-background([^\"]*)\"/g, 'className=\"$1bg-transparent$2\"');
  content = content.replace(/className=\"([^\"]*)bg-parchment([^\"]*)\"/g, 'className=\"$1bg-parchment/80$2\"');
  content = content.replace(/className=\"([^\"]*)bg-sandstone([^\"]*)\"/g, 'className=\"$1bg-sandstone/80$2\"');
  content = content.replace(/className=\"([^\"]*)bg-sacred-brown([^\"]*)\"/g, 'className=\"$1bg-sacred-brown/90$2\"');
  fs.writeFileSync(path.join(dir, file), content);
});
console.log('Backgrounds updated');
