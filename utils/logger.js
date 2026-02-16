
const chalk = require('chalk');

const log = (message) => console.log(message);

const info = (message) => log(chalk.blue(`💡 ${message}`));
const success = (message) => log(chalk.green(`✅ ${message}`));
const warning = (message) => log(chalk.yellow(`⚠️  ${message}`));
const danger = (message) => log(chalk.red(`🔥 ${message}`));
const header = (message) => log(chalk.bold.magenta(`
--- ${message} ---
`));
const link = (message) => log(chalk.cyan.underline(message));

module.exports = {
  log,
  info,
  success,
  warning,
  danger,
  header,
  link,
};
