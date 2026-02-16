const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const logger = require('../utils/logger');
const basicPatterns = require('../patterns');

const IGNORE_PATTERNS = ['node_modules/**', 'package-lock.json', 'yarn.lock'];

async function basicScanner() {
  logger.header('Running Free Scan ✨');
  let findings = 0;

  // 1. Check for .env file
  if (fs.existsSync('.env')) {
    logger.warning('Found a .env file.');
    logger.info('While .env files are common for local development, they should NOT be committed to version control. Make sure it is listed in your .gitignore file!');
    findings++;
  }

  // 2. Check for node_modules directory
  if (fs.existsSync('node_modules')) {
    logger.warning('Found a node_modules directory.');
    logger.info('This directory can contain thousands of files and should never be committed to version control. Ensure it is in your .gitignore file.');
    findings++;
  }

  // 3. Scan files for basic patterns
  const files = await glob('**/*', { nodir: true, ignore: IGNORE_PATTERNS });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const pattern of basicPatterns) {
      if (pattern.regex.test(content)) {
        logger.danger(`Found a ${pattern.name} in: ${file}`);
        logger.info(pattern.explanation);
        findings++;
      }
    }
  }

  if (findings === 0) {
    logger.success('No basic vulnerabilities found. Good job! 🎉');
  } else {
    logger.warning(`Found ${findings} potential issues in the free scan.`);
  }
}

module.exports = basicScanner;
