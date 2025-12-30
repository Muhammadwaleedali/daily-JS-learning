const fs = require('fs');
const { execSync } = require('child_process');

const jsTopics = [
  '// 1. Hoisting: var declarations are moved to top of scope',
  '// 2. Event Loop: Handles async operations in JavaScript',
  '// 3. Closures: Inner functions access outer function variables',
  '// 4. Prototypes: Objects inherit properties from prototype chain',
  '// 5. Promises: Handle asynchronous operations with .then()',
  '// 6. Arrow Functions: Shorter syntax, lexical this binding',
  '// 7. Destructuring: Extract values from arrays/objects easily',
  '// 8. Template Literals: Use backticks for string interpolation',
  '// 9. Spread Operator: ...array expands elements',
  '// 10. Async/Await: Cleaner syntax for promise-based code'
];

function createDailyFile() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const time = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
  const filename = `day${date}_${time}.js`;
  
  const content = jsTopics.join('\n');
  
  fs.writeFileSync(filename, content);
  execSync(`git add ${filename}`);
  execSync(`git commit -m "Add daily JS learning: 10 JavaScript concepts - ${date}"`);
  execSync('git push');
  
  console.log(`Created ${filename} with 10 JS topics!`);
}

createDailyFile();