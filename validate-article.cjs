const fs = require('fs');
const file = fs.readFileSync('src/shared/articles/game-dots-and-boxes-3.ts', 'utf8');

// Check description length
const descMatch = file.match(/description:\s*["']([^"']+)["']/);
console.log('Description length:', descMatch ? descMatch[1].length : 'not found');

// Check tags count
const tagsMatch = file.match(/tags:\s*\[([\s\S]*?)\]/);
console.log('Tags found:', tagsMatch ? 'yes' : 'no');

// Count tags
const tagCount = (file.match(/"Dots and Boxes"|"Chess"|"strategy comparison"|"cognitive skills"|"brain training"|"logic games"|"paper games"|"board games"/g) || []).length;
console.log('Tag count:', tagCount);

// Check faqs count
const faqCount = (file.match(/\{\s*q:/g) || []).length;
console.log('FAQ count:', faqCount);

// Check for backticks in content (should only be the template literal delimiters)
const contentMatch = file.match(/content:\s*`([\s\S]*)`/s);
if (contentMatch) {
  const backticks = (contentMatch[1].match(/`/g) || []).length;
  console.log('Backticks inside content:', backticks);
}

// Check required links
const content = contentMatch ? contentMatch[1] : '';
console.log('Has /dots-and-boxes link:', content.includes('href="/dots-and-boxes"'));
console.log('Has /chess link:', content.includes('href="/chess"'));
console.log('Has /chinese-checkers link:', content.includes('href="/chinese-checkers"'));
console.log('Has /reversi link:', content.includes('href="/reversi"'));

// Check cta-box
console.log('Has cta-box:', content.includes('class="cta-box"'));

// Check comparison table
console.log('Has table:', content.includes('<table>'));

// Check Sources
console.log('Has Sources:', content.includes('Sources & References'));

// Check backtick escape note - look for escaped backtick in content
console.log('Has escaped backtick:', content.includes('\\`'));

// Check for $ followed by { in content
const dollarBrace = (content.match(/\$\{/g) || []).length;
console.log('Dollar-brace sequences in content:', dollarBrace);
