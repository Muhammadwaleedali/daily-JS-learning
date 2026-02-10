const fs = require('fs');
const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('\n🚀 Welcome to Daily JS Learning Automation Setup!\n');
  console.log('This script will configure the automation for your repository.\n');
  
  // Get GitHub repository URL
  const repoUrl = await question('📦 Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): ');
  
  // Get local path
  const currentPath = process.cwd();
  console.log(`\n📁 Current directory: ${currentPath}`);
  const useCurrentPath = await question('Use this directory? (y/n): ');
  
  let repoPath;
  if (useCurrentPath.toLowerCase() === 'y') {
    repoPath = currentPath;
  } else {
    repoPath = await question('Enter the full path where you want to store the repository: ');
  }
  
  // Get Git user info
  console.log('\n👤 Git Configuration:');
  const gitName = await question('Enter your Git username: ');
  const gitEmail = await question('Enter your Git email: ');
  
  console.log('\n⚙️  Setting up your automation...\n');
  
  // Update daily-automation.js
  const automationPath = path.join(repoPath, 'daily-automation.js');
  let automationContent = fs.readFileSync(automationPath, 'utf8');
  automationContent = automationContent.replace(
    /const repoPath = '.*';/,
    `const repoPath = '${repoPath.replace(/\\/g, '\\\\')}';`
  );
  fs.writeFileSync(automationPath, automationContent);
  console.log('✅ Updated daily-automation.js with your path');
  
  // Configure Git
  try {
    execSync(`git config user.name "${gitName}"`, { cwd: repoPath });
    execSync(`git config user.email "${gitEmail}"`, { cwd: repoPath });
    console.log('✅ Configured Git user information');
  } catch (error) {
    console.log('⚠️  Git configuration skipped (may already be set globally)');
  }
  
  // Set remote URL
  try {
    execSync(`git remote set-url origin ${repoUrl}`, { cwd: repoPath });
    console.log('✅ Updated Git remote URL');
  } catch (error) {
    try {
      execSync(`git remote add origin ${repoUrl}`, { cwd: repoPath });
      console.log('✅ Added Git remote URL');
    } catch (err) {
      console.log('⚠️  Could not set remote URL. You may need to do this manually.');
    }
  }
  
  // Create batch file for Windows
  if (process.platform === 'win32') {
    const batchPath = path.join(require('os').homedir(), 'run-daily-js.bat');
    const batchContent = `@echo off\ncd /d "${repoPath}"\nnode daily-automation.js\npause`;
    fs.writeFileSync(batchPath, batchContent);
    console.log(`✅ Created batch file at: ${batchPath}`);
  }
  
  console.log('\n🎉 Setup Complete!\n');
  console.log('📋 Next Steps:');
  console.log('1. Run the automation: node daily-automation.js');
  console.log('2. Check your GitHub repository for the commits');
  if (process.platform === 'win32') {
    console.log(`3. Run from anywhere: ${path.join(require('os').homedir(), 'run-daily-js.bat')}`);
  }
  console.log('\n💡 Tip: The automation creates 10 commits with JavaScript learning topics.\n');
  
  const runNow = await question('Would you like to run the automation now? (y/n): ');
  if (runNow.toLowerCase() === 'y') {
    console.log('\n🚀 Running automation...\n');
    rl.close();
    require('./daily-automation.js');
  } else {
    console.log('\n👋 Setup complete! Run "node daily-automation.js" when ready.\n');
    rl.close();
  }
}

setup().catch(error => {
  console.error('❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});