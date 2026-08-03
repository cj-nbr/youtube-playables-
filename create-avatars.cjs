const fs = require('fs');
const path = 'D:/TOOLS WEB TOOLS/ytplayables/backend/public/avatars';

const colors = ['#0070f3','#7928ca','#eb4646','#f5a623','#50e3c2','#b8e986','#f8e71c','#417505','#bd10e0','#3d9970','#001aff','#ff4136','#2ecc40','#ffdc00','#0074d9','#b10dc9','#f012be','#39cccc','#7fdbff','#85144b'];
const names = ['avatar-blue','avatar-purple','avatar-red','avatar-orange','avatar-teal','avatar-green','avatar-yellow','avatar-lime','avatar-magenta','avatar-emerald','avatar-navy','avatar-crimson','avatar-olive','avatar-gold','avatar-sky','avatar-violet','avatar-pink','avatar-cyan','avatar-lightblue','avatar-maroon'];

for(let i=0; i<20; i++) {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="'+colors[i]+'"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="40" font-family="Arial">'+(i+1)+'</text></svg>';
  fs.writeFileSync(path + '/' + names[i] + '.svg', svg);
}
console.log('Created 20 avatar images');