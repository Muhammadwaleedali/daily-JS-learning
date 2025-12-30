const fs = require('fs');
const { execSync } = require('child_process');

const topics = [
  'JavaScript Hoisting and Temporal Dead Zone',
  'Event Loop and Call Stack',
  'Prototype Chain and Inheritance',
  'Memory Management and Garbage Collection',
  'Regular Expressions in JavaScript',
  'JSON Methods and Data Parsing',
  'Local Storage and Session Storage',
  'Fetch API and HTTP Requests',
  'JavaScript Debugging Techniques',
  'Performance Optimization Tips'
];

const comments = [
  '// Hoisting moves declarations to top of scope\n// let/const have temporal dead zone, var doesn\'t',
  '// Event loop handles async operations\n// Call stack executes synchronous code',
  '// Every object has __proto__ property\n// Constructor functions create prototype chain',
  '// JavaScript uses mark-and-sweep garbage collection\n// Avoid memory leaks with proper cleanup',
  '// RegExp objects test and match string patterns\n// Use flags like g, i, m for different behaviors',
  '// JSON.parse() converts string to object\n// JSON.stringify() converts object to string',
  '// localStorage persists data across sessions\n// sessionStorage clears when tab closes',
  '// fetch() returns a Promise for HTTP requests\n// Use .then() or async/await for responses',
  '// console.log(), debugger, and browser DevTools\n// Use breakpoints and step-through debugging',
  '// Minimize DOM manipulation and use event delegation\n// Debounce/throttle expensive operations'
];

function createDailyFiles() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  
  for (let i = 0; i < 10; i++) {
    const filename = `day${date}_${i}.js`;
    fs.writeFileSync(filename, comments[i]);
    
    execSync(`git add ${filename}`);
    execSync(`git commit -m "Add daily learning: ${topics[i]} - Day ${date} file ${i + 1}"`);
  }
  
  execSync('git push');
  console.log('Daily files created and pushed successfully!');
}

createDailyFiles();