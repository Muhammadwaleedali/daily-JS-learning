const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Change to the correct directory
const repoPath = 'c:\\Users\\User\\Desktop\\Daily_improvement_code_JS';
process.chdir(repoPath);

const baseTopics = [
  'Hoisting: var declarations are moved to top of scope',
  'Event Loop: Handles async operations in JavaScript',
  'Closures: Inner functions access outer function variables',
  'Prototypes: Objects inherit properties from prototype chain',
  'Promises: Handle asynchronous operations with .then()',
  'Arrow Functions: Shorter syntax, lexical this binding',
  'Destructuring: Extract values from arrays/objects easily',
  'Template Literals: Use backticks for string interpolation',
  'Spread Operator: ...array expands elements',
  'Async/Await: Cleaner syntax for promise-based code'
];

const baseTopicNames = [
  'JavaScript Hoisting',
  'Event Loop Concepts',
  'Closures and Scope',
  'Prototype Chain',
  'Promise Handling',
  'Arrow Functions',
  'Destructuring Assignment',
  'Template Literals',
  'Spread Operator',
  'Async/Await Pattern'
];

const DEFAULT_COMMIT_COUNT = 50;

function createDailyFiles() {
  const requestedCount = Number.parseInt(process.argv[2], 10);
  const commitCount = Number.isFinite(requestedCount) && requestedCount > 0
    ? requestedCount
    : DEFAULT_COMMIT_COUNT;
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const baseTime = new Date();
  
  console.log(`\n🚀 Starting daily JS learning automation...`);
  console.log(`📅 Date: ${date}`);
  console.log(`📁 Repository: ${repoPath}\n`);
  
  for (let i = 0; i < commitCount; i++) {
    const topicIndex = i % baseTopics.length;
    const topicLine = `// ${baseTopics[topicIndex]} (Entry ${i + 1})`;
    const topicName = `${baseTopicNames[topicIndex]} #${i + 1}`;
    const time = new Date(baseTime.getTime() + i * 1000).toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `day${date}_${i + 1}_${time}.js`;
    
    // Create file with topic
    fs.writeFileSync(filename, topicLine);
    
    // Git operations
    execSync(`git add ${filename}`);
    const commitMsg = `Add ${topicName} - Daily JS Learning Day ${date} Topic ${i + 1}`;
    execSync(`git commit -m "${commitMsg}"`);
    
    console.log(`✅ Commit ${i + 1}/${commitCount}: ${filename}`);
    console.log(`   📝 Topic: ${topicName}`);
    console.log(`   💬 Message: ${commitMsg}`);
    
    // Push each commit
    execSync('git push');
    console.log(`   🚀 Pushed to remote\n`);
    
    // Small delay to ensure unique timestamps
    if (i < commitCount - 1) {
      // Use a simple loop for delay instead of timeout command
      const start = Date.now();
      while (Date.now() - start < 1000) {
        // Wait 1 second
      }
    }
  }
  
  console.log(`🎉 Successfully created and pushed ${commitCount} commits!`);
  console.log(`📊 Total files created: ${commitCount}`);
  console.log(`📤 Total commits pushed: ${commitCount}`);
}

createDailyFiles();