const fs = require('fs');
const { glob } = require('glob');
const logger = require('../utils/logger');
const premiumPatterns = require('../patterns-premium');

const IGNORE_PATTERNS = ['node_modules/**', 'package-lock.json', 'yarn.lock'];

async function advancedScanner() {
  logger.header('Running Premium Scan 💎');
  let findings = 0;

  const files = await glob('**/*', { nodir: true, ignore: IGNORE_PATTERNS });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const pattern of premiumPatterns) {
      if (pattern.regex.test(content)) {
        logger.danger(`Found a ${pattern.name} in: ${file}`);
        logger.info(pattern.explanation);
        findings++;
      }
    }
  }


  logger.info('As a premium user, you can use a pre-commit hook to automate these checks.');
  logger.log('To set it up, create a file at .git/hooks/pre-commit and add this content:');
  const hookScript = `
#!/bin/sh
#
# A basic pre-commit hook to run safe-push before committing.
#

echo "Running vibe-safe-push scan before commit..."
npx vibe-safe-push

# If the scan fails (exits with a non-zero code), prevent the commit
if [ $? -ne 0 ]; then
  echo "Commit aborted by safe-push scan. Please fix the issues."
  exit 1
fi

echo "Scan passed. Proceeding with commit."
exit 0
`;
  logger.log(chalk.gray(hookScript));


  if (findings === 0) {
    logger.success('No advanced vulnerabilities found. Your code looks very secure! 🚀');
  } else {
    logger.warning(`Found ${findings} potential issues in the premium scan.`);
  }
}

module.exports = advancedScanner;
