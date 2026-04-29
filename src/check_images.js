const fs = require('fs');
const path = require('path');

function getPNGSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.toString('ascii', 1, 4) !== 'PNG') return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

const dir = 'd:/Techfleek/maa-unique-dham/public/images/home-page/hero';
for (let i = 1; i <= 5; i++) {
  const file = `banner ${i}.png`;
  const size = getPNGSize(path.join(dir, file));
  console.log(`${file}: ${size ? size.width + 'x' + size.height : 'unknown'}`);
}
